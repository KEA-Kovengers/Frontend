import React, { useState, useRef, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Button, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
  
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, Viewer } from '@toast-ui/react-editor';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { toolbar } from './md-toolbar';

import { PostGenerateHashtag } from 'src/api/ai.api';
import { PostObjectUpload } from 'src/api/posts.api';
import { SetUpWebSocket } from 'src/api/posts.api';

import { GetPostID } from 'src/api/posts.api';

// import { set } from 'lodash';
import axios from 'axios';

import { useEditStore } from 'src/store/useEditStore.js';
import { set } from 'lodash';

// 수정해야하는 부분: 블럭 삭제 버튼
export default function MdEditorWithHeader({ userID, postID, title, setTitle, tags, setTags, onChangeContents }) {

  const [tagInput, setTagInput] = useState('');
  const [contents, setContents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // 수정 중인 문장의 인덱스

  const tagRef = useRef(null);

  const editorRef1 = useRef (null);
  const editorRef2 = useRef (null);
  
  const {
          editorHtml1, editorHtml2, 
          updateEditorHtml1, updateEditorHtml2,
        } = 
          useEditStore((state) => ({
            editorHtml1: state.editInfo.editorHtml1,
            editorHtml2: state.editInfo.editorHtml2,

            updateEditorHtml1: state.updateEditInfo.bind(null, 'editorHtml1'),
            updateEditorHtml2: state.updateEditInfo.bind(null, 'editorHtml2'),
          }));

  const { setEditorRef1, setEditorRef2 } = useEditStore();

  // ----------------------------------------------------------

  // 컴포넌트가 마운트될 때 ref를 업데이트합니다.
  useEffect(() => {
  setEditorRef1(editorRef1.current);
  setEditorRef2(editorRef2.current);
}, [setEditorRef1, setEditorRef2]);

/*----------------------------------------------------------*/

// 제목 입력창의 너비를 동적으로 조절하는 함수
const handleTitleChange = (event) => {
  const newTitle = event.target.value;
  setTitle(newTitle);
  onChangeContents({ title: newTitle, tags });
};

/*----------------------------------------------------------*/

  // 해시태그 입력창의 너비를 동적으로 조절하는 함수
  useEffect(() => {
    if (tagRef.current && tagInput) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = window.getComputedStyle(tagRef.current).fontSize + 'px sans-serif';
      const width = context.measureText(tagInput).width;
      tagRef.current.style.width = `${width}px`;
    }
  }, [tagInput]);

  // 태그 입력창의 너비를 동적으로 조절하는 함수
  const handleTagsChange = (event) => {
    setTagInput(event.target.value);
  };

  // 태그 입력창에서 엔터키를 누르면 태그를 추가하는 함수
  const handleTagKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newTag = `#${tagInput.trim()}`;
      if (newTag && !tags.includes(newTag)) {
        const newTags = [...tags, newTag];
        setTags(newTags);
        onChangeContents({ title, tags: newTags });
        setTagInput('');
      }
    }
  };

  // 태그 삭제 버튼 클릭 시 실행되는 함수
  const handleTagClick = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    onChangeContents({ title, tags: updatedTags });

    console.log('tags', tags);
  };


  // ai 태그 생성 버튼 클릭 시 실행되는 함수
  const handleAiTagClick = () => {
    const text = contents.join(' ');
    console.log('text', text);
    PostGenerateHashtag(text)
      .then((res) => {
        console.log('res', res);
        
        const inputStringList = res.data;
        inputStringList.forEach((inputString) => {
          const tagsToAdd = inputString.split(' ');
          tagsToAdd.forEach((tag) => {
            setTags((prevTags) => [...prevTags, tag]);
          });
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
  
  // contents 배열이 업데이트될 때마다 실행되는 useEffect
  // useEffect(() => {
  //   console.log(contents.length);
  //   console.log('useEffect triggered with contents:', contents);

  //   setBlockContents(contents);
  // }, [contents]);

  const [articleVersion, setArticleVersion] = useState('0.0');
  const [stompClient, setStompClient] = useState(null);
  const [blockIds, setBlockIds] = useState([]);
  const [blockContents, setBlockContents] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const articleID = 5;

  const fetchData = async () => {
    try {
      const response = await GetPostID(postID);

      const json = response.data;
      if (json.isSuccess) {
        setArticleVersion(json.result.articleVersion);
        storeBlockData(json.result.blockList);
      } else {
        throw new Error('API response was not successful');
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  // 웹 소켓 연결 및 메세지 수신 코드
  useEffect(() => {
    if (!postID) {
        console.log('postID is not set');
        return;
    }

    fetchData();

    const client = SetUpWebSocket();

    // 웹소켓 연결 이벤트 정의
    client.onConnect = (frame) => {

        console.log('Connected: ' + frame);

        const destination = `/exchange/${postID}/fanout`;
        // console.log('postID:', postID);

        // 구독 정의
        // 웹소켓의 STOMP 프로토콜을 사용한다.
        // STOMP 프로토콜은 PUB/SUB구조로 메세지를 주고 받는 프로토콜이다.
        // SUBSCRIBE : 메세지를 수신하기 위한 구독. 구독중인 주제(Topic)에 메세지가 발행되면 해당 메세지를 수신한다.
        // PUBLSH : 메세지를 발행하는 명령어. 주제(Topic)에 메세지를 발행한다.
        client.subscribe(destination, (greeting) => {
        const response = JSON.parse(greeting.body);
        const destination = response.dest;

        const dests = destination.split('/');

        // console.log('response result: ', response.result);
        
        // 메세지 수신시 메세지 처리 부분
        // 메세지의 목직지에 따라 다른 처리를 함
        if (dests[1] === 'updateBlock') {
            receiveUpdateBlock(response.result);
        } else if (dests[1] === 'createBlock') {
            receiveCreateBlock(response.result);
        // } else if (dests[1] === 'updateBlockSequence') {
        //     receiveUpdateBlockSequence(response.result);
        } else if (dests[1] === 'deleteBlock') {
            receiveDeleteBlock(response.result);
        }

        console.log("Received: " + greeting.body);
        });
    };

    // 웹소켓 에러 이벤트 정의
    client.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
    };

    // STOMP 에러 이벤트 정의
    client.onStompError = (frame) => {
        // console.error('Broker reported error: ' + frame.headers['message']);
        // console.error('Additional details: ' + frame.body);
        console.error('STOMP error:', frame.headers['message']);
        if (frame.body) {
          console.error('STOMP error details:', frame.body);
        }
        // Retry connection
        connectToStomp();
    };

    client.activate();
    setStompClient(client);
  }, [postID]);

  
  // contents 배열이 업데이트될 때마다 실행되는 useEffect
  useEffect(() => {
    console.log(contents.length);
    console.log('useEffect triggered with contents:', contents);
    
  }, [contents]);

  
  // 블록 데이터를 저장
  const storeBlockData = (blockList) => {
      // 블럭 아이디 및 내용을 저장
      const ids = [];
      const contents = [];

      blockList.forEach(block => {
          ids.push(block.id);
          contents.push(block.content);
      });

      setBlockIds(ids);
      setBlockContents(contents);

      console.log('블록 데이터의 아이디를 보여줍니다: ',blockIds);
      console.log('블록 데이터의 내용을 보여줍니다: ',blockContents);
  };

  // 블럭 생성 요청 정의
  const createBlock = () => {
    
    stompClient.publish({
      destination: `/app/createBlock/${postID}`,
      body: JSON.stringify({
          'uuid': 'testtest',
          'userID': userID,
          'dto': {
              'articleVersion': articleVersion,
              'blockType': 'testBlockType',
              'position': blockIds.length,
              'content': blockContents.join(', '), // 배열의 요소를 문자열로 변환
              // 'content': blockContents.toString(), // array to string 필요
              'blockParent': {
                  'type': 'testType',
                  'page_id': 'testPageId'
              },
              'created_by': {
                  'creator_id': userID,
                  'created_at': new Date().toISOString()
              }
          }
      })
    });
  };

  // 블럭 생성 메세지 수신
  const receiveCreateBlock = (dto) => {
    console.log('receiveCreateBlock:', dto);

    setBlockIds(prev => [...prev.slice(0, dto.position), dto.blockDTO.id, ...prev.slice(dto.position)]);
    setBlockContents(prev => [...prev.slice(0, dto.position), dto.blockDTO.content, ...prev.slice(dto.position)]);
    setArticleVersion(dto.articleVersion);

    // blockId 상태 변수 업데이트
    setBlockId(dto.blockDTO.id);
  };


  // 블럭 내용 업데이트 요청 정의
  const updateBlock = (operationType) => {
    // const blockId = document.getElementById('n_block1').value;
    // const blockContent = document.getElementById('block_content').value;
    // const textPosition = document.getElementById('text_position').value;
    // blockId 상태 변수 사용
    let entityId = blockId;
    let entityType = "";
    let operationType2 = "";

    // 텍스트 삽입, 삭제, 태그 명령에 따라 entityType와 operationType2를 정의
    
    // 텍스트 삽입
    if (operationType === 'INSERT') {
        entityType = 'TEXT';
        operationType2 = 'INSERT';
    } 
    // 텍스트 삭제
    else if (operationType === 'DELETE') {
        entityType = 'TEXT';
        operationType2 = 'DELETE';
    } 
    // 태그
    else if (operationType === 'TAG') {
        entityType = 'TAG';
        operationType2 = 'INSERT';
    }

    // 서버에 메세지 발행
    //URL과 DTO는 노션의 명세서 참고  // blockIds 배열의 첫 번째 ID만 업데이트
    // const blockId = blockIds[0];
    
    console.log('blockIds: ',blockIds);

    stompClient.publish({
      destination: `/app/updateBlock/${postID}`,
      body: JSON.stringify({
        'uuid': 'testtest',
        'userID': userID,
        'dto': {
          // 'blockId': blockId,
          'blockId' : entityId,
          'articleVersion': articleVersion,
          'entityType': entityType,
          'operationType': operationType2,
          'position': 1,
          'content' : editorHtml1, // 에디터의 내용을 content로 사용
          'updated_by': {
            'updater_id': userID,
            'updated_at': new Date().toISOString()
          }
        }
      })
    });
    // console.log('업데이트 블록 속 blockId: ', blockId);

    // // blockIds 배열의 각 ID를 개별적으로 업데이트
    // blockIds.forEach((blockId) => {
    //   stompClient.publish({
    //     destination: `/app/updateBlock/${postID}`,
    //     body: JSON.stringify({
    //       'uuid': 'testtest',
    //       'userID': userID,
    //       'dto': {
    //         'blockId': blockId, // 개별 블록 ID 사용
    //         'articleVersion': articleVersion,
    //         'entityType': entityType,
    //         'operationType': operationType2,
    //         'position': 1,
    //         'content' : editorHtml1, // 에디터의 내용을 content로 사용
    //         'updated_by': {
    //           'updater_id': userID,
    //           'updated_at': new Date().toISOString()
    //         }
    //       }
    //     })
    //   });
    //   console.log('업데이트 블록 속 blockIds: ', blockIds);
    //   console.log('업데이트 블록 속 blockId: ', blockId);
    // });

    // stompClient.publish({
    //     destination: `/app/updateBlock/${postID}`,
    //     body: JSON.stringify({
    //         'uuid': 'testtest',
    //         'userID': userID,
    //         'dto': {
    //             'blockId': blockIds.toString(),
    //             'articleVersion': articleVersion,
    //             'entityType': entityType,
    //             'operationType': operationType2,
    //             'position': 1,
    //             'content': blockContents.toString(),
    //             'updated_by': {
    //                 'updater_id': userID,
    //                 'updated_at': new Date().toISOString()
    //             }
    //         }
    //     })
    // });
  };  

  

  // 블럭 업데이트 메세지 수신 및 로직 정의
  const receiveUpdateBlock = (dto) => {
    console.log('receiveUpdateBlock:', dto);

    // 게시글에 대한 편집 내용을 수신하면 해당 버전에 맞게 로컬 게시글 버전을 업데이트 해야함
    // 만약 네트워크 속도로 인해 낮은 버전이 먼저 도착하면 무시해야함
    setArticleVersion(dto.articleVersion);
    const index = blockIds.indexOf(dto.blockId);

    // 업데이트 메소드에 따라 다른 작업 수행
    // TAG는 블록 내용을 완전히 교체함
    if (dto.entityType === 'TAG') {
        setBlockContents(prev => {
            const newContents = [...prev];
            newContents[index] = dto.content;
            return newContents;
        });
    } 
    // INSERT는 블록 내용에 추가함
    // position변수는 충돌이 발생하면 서버에서 OT알고리즘으로 적절히 수정해주기때문에
    // position 위치에 content를 입력하면 된다.
    else if (dto.operationType === 'INSERT') {
        setBlockContents(prev => {
            const newContents = [...prev];
            newContents[index] = (newContents[index] || '') + dto.content;
            return newContents;
        });
    } 
    // DELTE는 블록 내용에서 삭제함
    // position위치로부터 content길이만큼 삭제하면 된다.
    else if (dto.operationType === 'DELETE') {
        setBlockContents(prev => {
            const newContents = [...prev];
            newContents[index] = newContents[index].slice(0, dto.position) + newContents[index].slice(dto.position + dto.content.length);
            return newContents;
        });
    }
  };

  // 블럭 삭제 요청 정의
  const blockDelete = () => {
    // const blockIds = document.getElementById('n_block3').value;

    // 서버에 메세지 발행
    // URL과 DTO는 노션의 명세서를 참고
    stompClient.publish({
        destination: `/app/deleteBlock/${postID}`,
        body: JSON.stringify({
            'uuid': 'testtest',
            'userID': userID,
            'dto': blockIds.toString()
        })
    });
  };

  // 블럭 삭제 메세지 수신
  const receiveDeleteBlock = (dto) => {
    console.log('receiveDeleteBlock:', dto);
    setArticleVersion(dto.articleVersion);
    setBlockIds(prev => prev.filter(id => id !== dto.blockId));
    setBlockContents(prev => prev.filter((_, index) => index !== blockIds.indexOf(dto.blockId)));
  };

  /*----------------------------------------------------------*/

    // 저장 버튼 클릭 시 실행되는 함수
    const handleCompleteButtonClick = () => {
      const editorInstance = editorRef1.current.getInstance();
      const currentContent = editorInstance.getMarkdown();
      const updatedContents = [...contents, currentContent]; // 새로운 내용을 기존 contents 배열에 추가
      setContents(updatedContents); // contents 배열 업데이트
      console.log('저장');
  
      // 에디터를 초기화하고 toolbar가 적용된 Editor로 전환
      editorInstance.setMarkdown('');
      setEditingIndex(null);
  
      // 저장 버튼을 눌렀을 때 createBlock 요청 + text insert
      // 취소 완료 버튼이 있을 때는 text insert 이런 것만 가능하게끔
      if (postID && stompClient && stompClient.connected && blockIds && blockContents) {
        console.log('useEffect createBlock');
        createBlock();
      }
      updateBlock('INSERT');
    };

    const handleDeleteButtonClick = () => { 
      console.log('삭제');
      blockDelete();
      // updateBlock('DELETE');

      // Remove the content from the contents array based on editingIndex
      setContents(prevContents => prevContents.filter((_, idx) => idx !== editingIndex));
      setEditingIndex(null); // Reset the editing index
    }
  
    // 취소 버튼 클릭 시 실행되는 함수
    const handleCancelButtonClick = () => {
      setEditingIndex(null); // 취소 버튼 클릭 시 편집 중인 상태를 초기화
    };
  
    // 문장 클릭 시 편집 가능하도록 설정하는 함수
    const handleContentClick = (index) => {
      setEditingIndex(index === editingIndex ? null : index);
    };
  
    // 편집 완료 버튼 클릭 시 실행되는 함수
    const handleEditComplete = () => {
      if (
        // 편집기 인스턴스가 존재하고, 편집할 항목이 유효하게 선택되었을 때
        editorRef2.current &&
        editorRef2.current.getInstance &&
        editingIndex !== null &&
        editingIndex >= 0 &&
        editingIndex < contents.length
      ) {
        // 현재 편집기 인스턴스에서 markdown을 가져옴
        const editedContent = editorRef2.current.getInstance().getMarkdown();
        console.log('editedContent', editedContent);
  
        // 기존 contents 배열을 복사하여 수정된 내용을 반영
        const updatedContents = [...contents];
        // 수정된 내용을 기존 contents 배열에 반영
        updatedContents[editingIndex] = editedContent;
        // contents 배열을 업데이트
        setContents(updatedContents);
  
        // 편집 중인 상태를 초기화 ... 편집이 완료되었음
        setEditingIndex(null);
      }
    };
    
  /*----------------------------------------------------------*/
  
    // 에디터에 작성하면 한 글자씩 마크다운이 적용되어 콘솔에 출력
    const onChange = () => {
      if (editorRef1.current) {
        const editorHtml1 = editorRef1.current.getInstance().getMarkdown();
        updateEditorHtml1(editorRef1.current.getInstance().getMarkdown());
        console.log('editorHtml1:', editorHtml1);

        // updateBlock('INSERT');
      }
      else if (editorRef2.current) {
        const editorHtml2 = editorRef2.current.getInstance().getMarkdown();
        updateEditorHtml2(editorRef2.current.getInstance().getMarkdown());
        console.log('editorHtml2: ',editorHtml2);

        // updateBlock('INSERT');
      }
    }
  
  /*----------------------------------------------------------*/

  // console.log('title:', title);
  // console.log('tags:', tags);
  // console.log('contents:', contents);

  // ----------------------------------------------------------

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={handleTitleChange}
        style={{
          marginBottom: '10px',
          width: '100%',
          padding: '9px',
          fontSize: '2em',
          border: 'none',
          outline: 'none',
          color: '#000',
        }}
      />
      <hr style={{ width: '5%', margin: '6px 0', borderTop: '3px solid black', marginLeft: '0.8%' }}/>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        {tags.map((tag, index) => (
          <div
            key={index}
            style={{
              height: 35,
              border: '2px solid #E3E6FF',
              borderRadius: 30,
              color: 'black',
              marginRight: '5px',
              padding: '10px',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleTagClick(index)}
          >
            {tag}
          </div>
        ))}
        <input
          type="text"
          placeholder="태그를 입력하세요"
          value={tagInput}
          onChange={handleTagsChange}
          onKeyPress={handleTagKeyPress}
          style={{
            flex: '1',
            padding: '14px',
            fontSize: '20m',
            border: 'none',
            outline: 'none',
            marginTop: '7px',
          }}
          ref={tagRef}
        /> 
        
        <Button
          onClick={contents.length > 0 ? handleAiTagClick : null}
          sx={{
            bgcolor: '#8A94EF',
            borderRadius: 3,
            color: 'white',
            fontSize: '18px',
            display: 'flex',
            gap: 1, 
          }}>
            <Iconify 
              icon="fa6-solid:hashtag" 
              sx={{ width: '25px', height: '25px' }}
            /> 
            <Typography variant="body1"> 
              AI 태그
            </Typography>
        </Button>
      </div>

      {/* 편집할 때, 에디터 컴포넌트 (취소,완료 버튼 있는) */}
      {contents.map((content, index) => (
        <Box
          key={index}
          sx={{ marginBottom: '10px', position: 'relative', cursor: 'pointer' }}
          onClick={() => index !== editingIndex && handleContentClick(index)} // 문장 클릭 시 편집 가능하도록 설정
        >
          {editingIndex === index ? (
            <Stack>
              <Editor
                previewStyle="vertical"
                initialValue={content}
                placeholder="글을 작성해 주세요"
                toolbarItems={toolbar}
                height="300px"
                plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
                ref={editorRef2}
                onChange={onChange}
                hooks={{
                  addImageBlobHook: async(blob, callback) => {
                    console.log(blob);
        
                    const formData = new FormData();
                    formData.append('files', blob);
        
                    console.log(callback);
        
                    try{
                      const response = await PostObjectUpload(formData);
                      console.log('md-editor: ',response);
        
                      const imageUrl = response.data;
                      console.log('upload response: ',imageUrl);
                      callback(imageUrl, 'Uploaded image');
                    } catch (error) {
                      console.error('Failed to upload image', error);
                    }
                  }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={handleDeleteButtonClick}
                  sx={{
                    width: 20,
                    height: 25,
                    bgcolor: '#1A2CDD',
                    borderRadius: 3,
                    color: 'white',
                    margin: '8px',
                  }}
                >
                  <Typography variant="body1" sx={{ fontSize: '12px' }}>
                    삭제
                  </Typography>
                </Button>
                <Button
                  onClick={handleCancelButtonClick}
                  sx={{
                    width: 20,
                    height: 25,
                    border: '2px solid #E3E6FF',
                    borderRadius: 3,
                    color: 'black',
                    margin: '8px',
                    marginRight: '3px',
                  }}
                >
                  <Typography variant="body1" sx={{ fontSize: '12px' }}>
                    취소
                  </Typography>
                </Button>
                <Button
                  onClick={() => handleEditComplete()}
                  sx={{
                    width: 20,
                    height: 25,
                    bgcolor: '#1A2CDD',
                    borderRadius: 3,
                    color: 'white',
                    margin: '8px',
                  }}
                >
                  <Typography variant="body1" sx={{ fontSize: '12px' }}>
                    완료
                  </Typography>
                </Button>
              </Box>
            </Stack>
          ) : (

          // 마크다운 형식으로 작성한 글 보기
          <Viewer initialValue={content} />

          )}
        </Box>
      ))}

      {/* 편집할 때, 에디터 컴포넌트 (취소,완료 버튼 있는) */}

      {editingIndex === null && (
      <>
      <Editor
        previewStyle="vertical"
        initialEditType="markdown"
        placeholder="글을 작성해 주세요"
        toolbarItems={toolbar}
        height="300px"
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        ref={editorRef1}
        onChange={onChange}

        hooks={{
          addImageBlobHook: async(blob, callback) => {
            console.log(blob);

            const formData = new FormData();
            formData.append('files', blob);

            console.log(callback);

            try{
              const response = await PostObjectUpload(formData);
              console.log('md-editor: ',response);

              const imageUrl = response.data;
              console.log('upload response: ',imageUrl);
              callback(imageUrl, 'Uploaded image');
            } catch (error) {
              console.error('Failed to upload image', error);
            }
          }
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>

        <Button
          onClick={() => {
            handleCompleteButtonClick();
            // createBlock(postID, stompClient, blockIds, blockContents);
          }}
          sx={{
            width: 20,
            height: 25,
            bgcolor: '#1A2CDD',
            borderRadius: 3,
            color: 'white',
            margin: '8px',
          }}
        >
          <Typography variant="body1" sx={{ fontSize: '12px' }}>
            저장
          </Typography>
        </Button>
      </Box>
      </>
      )}
      
    </div>
  );
}