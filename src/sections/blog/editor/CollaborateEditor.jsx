import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Button, Typography, IconButton } from '@mui/material';
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
import { useAccountStore } from 'src/store/useAccountStore';

import { useEditStore } from 'src/store/useEditStore.js';
import { ConnectingAirportsOutlined } from '@mui/icons-material';

// 수정해야하는 부분: 블럭 삭제 버튼
export default function CollaborateEditor({
  postID,
  title,
  setTitle,
  tags,
  setTags,
  onChangeContents,
}) {
  const { accountInfo } = useAccountStore();
  const userID = accountInfo.id;

  const [tagInput, setTagInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); // 수정 중인 문장의 인덱스

  const tagRef = useRef(null);

  const editorRef1 = useRef(null);
  const editorRef2 = useRef(null);

  const { editorHtml1, editorHtml2, updateEditorHtml1, updateEditorHtml2 } = useEditStore(
    (state) => ({
      editorHtml1: state.editInfo.editorHtml1,
      editorHtml2: state.editInfo.editorHtml2,

      updateEditorHtml1: state.updateEditInfo.bind(null, 'editorHtml1'),
      updateEditorHtml2: state.updateEditInfo.bind(null, 'editorHtml2'),
    })
  );

  const { setEditorRef1, setEditorRef2 } = useEditStore();

  // ----------------------------------------------------------

  // 컴포넌트가 마운트될 때 ref를 업데이트합니다.
  useEffect(() => {
    setEditorRef1(editorRef1.current);
    setEditorRef2(editorRef2.current);
  }, [setEditorRef1, setEditorRef2]);

  useEffect(() => {
    if (editorRef2.current) {
      updateEditorHtml2(editorRef2.current.getInstance().getMarkdown());
    }
  }, [editorRef2, editingIndex]);

  /*----------------------------------------------------------*/

  const updateTitle = (changed, position, type) => {
    // 서버에 메세지 발행
    client.current.publish({
      destination: `/app/updateTitle/${postID}`,
      body: JSON.stringify({
        uuid: 'testtest',
        userID: userID,
        dto: {
          articleID: postID,
          articleVersion: articleVersion,
          operationType: type,
          entityType: 'TITLE',
          position: position,
          content: changed,
          updated_by: {
            updater_id: userID,
            updated_at: new Date().toISOString(),
          },
        },
      }),
    });
  };
  function findInsertionIndices(original, modified) {
    let startIndex = 0;
    let endIndexOriginal = original.length;
    let endIndexModified = modified.length;

    // Find the start index where the original and modified first differ
    while (
      startIndex < endIndexOriginal &&
      startIndex < endIndexModified &&
      original[startIndex] === modified[startIndex]
    ) {
      startIndex++;
    }

    // Find the end index where the original and modified last differ
    while (
      endIndexOriginal > startIndex &&
      endIndexModified > startIndex &&
      original[endIndexOriginal - 1] === modified[endIndexModified - 1]
    ) {
      endIndexOriginal--;
      endIndexModified--;
    }

    return {
      startIndex: startIndex,
      endIndex: endIndexModified,
    };
  }
  function findDeletionIndices(original, modified) {
    let startIndex = 0;
    let endIndexOriginal = original.length;
    let endIndexModified = modified.length;

    // Find the start index where the original and modified first differ
    while (
      startIndex < endIndexOriginal &&
      startIndex < endIndexModified &&
      original[startIndex] === modified[startIndex]
    ) {
      startIndex++;
    }

    // Find the end index where the original and modified last differ
    while (
      endIndexOriginal > startIndex &&
      endIndexModified > startIndex &&
      original[endIndexOriginal - 1] === modified[endIndexModified - 1]
    ) {
      endIndexOriginal--;
      endIndexModified--;
    }

    return {
      startIndex: startIndex,
      endIndex: endIndexOriginal,
    };
  }
  // 제목 입력창의 너비를 동적으로 조절하는 함수
  const handleTitleChange = (event) => {
    console.log('articleTitle', articleTitle);
    const newTitle = event.target.value;

    console.log('지금 바뀐 제목', newTitle);

    console.log('지금 제목 길이', newTitle.length);

    if (newTitle.slice(articleTitle.length).length > 0) {
      console.log('바뀐 부분만', newTitle.slice(articleTitle.length));
      updateTitle(newTitle.slice(articleTitle.length), articleTitle.length, 'INSERT');
    }
    // 제목 삭제
    if (newTitle.length < articleTitle.length) {
      const deleted = findDeletionIndices(articleTitle, newTitle);
      console.log('삭제된 인덱스', deleted);
      console.log('삭제된 부분', articleTitle.slice(deleted.startIndex, deleted.endIndex));
      updateTitle(
        articleTitle.slice(deleted.startIndex, deleted.endIndex),
        deleted.startIndex,
        'DELETE'
      );
    }
  };

  // 태그 입력창의 너비를 동적으로 조절하는 함수
  const handleTagsChange = (event) => {
    setTagInput(event.target.value);
  };

  // 태그 입력창에서 엔터키를 누르면 태그를 추가하는 함수
  const handleTagKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('태그 내용: ', tagInput);
      updateHashtag(tagInput, 'INSERT');
      setTagInput('');
    }
  };

  // 태그 삭제 버튼 클릭 시 실행되는 함수
  const handleTagClick = (tag) => {
    updateHashtag(tag, 'DELETE');
  };

  // ai 태그 생성 버튼 클릭 시 실행되는 함수
  const handleAiTagClick = () => {
    console.log('AI 태그 생성 버튼 클릭');
    const text = blockContents.join(' ');
    console.log('text', text);
    PostGenerateHashtag(text)
      .then((res) => {
        console.log('res', res);

        const inputStringList = res.data;
        inputStringList.forEach((inputString) => {
          const tagsToAdd = inputString.split(' ');
          tagsToAdd.forEach((tag) => {
            setHashtagsList((prevTags) => [...prevTags, tag]);
          });
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const [articleVersion, setArticleVersion] = useState('0.0');
  // const [stompClient, setStompClient] = useState(null);
  const [blockIds, setBlockIds] = useState([]);
  const [blockContents, setBlockContents] = useState([]);
  const [articleTitle, setArticleTitle] = useState('');
  const [hashtagsList, setHashtagsList] = useState([]);
  const client = useRef(null);
  // const articleID = 5;

  const fetchData = async () => {
    try {
      const response = await GetPostID(postID);

      const json = response.data;
      console.log('json', json);
      if (json.isSuccess) {
        setArticleTitle(json.result.title);
        setArticleVersion(json.result.articleVersion);
        storeBlockData(json.result.blockList);
        setHashtagsList(json.result.hashtags);
      } else {
        throw new Error('API response was not successful');
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  // 웹 소켓 연결 및 메세지 수신 코드
  useEffect(() => {
    fetchData();
  }, []);

  const setupWebSocket = () => {
    if (!postID) {
      console.log('postID is not set');
      return;
    }

    client.current = SetUpWebSocket();

    // 웹소켓 연결 이벤트 정의
    client.current.onConnect = (frame) => {
      console.log('Connected: ' + frame);

      const destination = `/exchange/${postID}/fanout`;

      subscribe(destination);

      // 구독 정의
      // 웹소켓의 STOMP 프로토콜을 사용한다.
      // STOMP 프로토콜은 PUB/SUB구조로 메세지를 주고 받는 프로토콜이다.
      // SUBSCRIBE : 메세지를 수신하기 위한 구독. 구독중인 주제(Topic)에 메세지가 발행되면 해당 메세지를 수신한다.
      // PUBLISH : 메세지를 발행하는 명령어. 주제(Topic)에 메세지를 발행한다.
    };

    // 웹소켓 에러 이벤트 정의
    client.current.onWebSocketError = (error) => {
      console.error('Error with websocket', error);
    };

    // STOMP 에러 이벤트 정의
    client.current.onStompError = (frame) => {
      // console.error('Broker reported error: ' + frame.headers['message']);
      // console.error('Additional details: ' + frame.body);
      console.error('STOMP error:', frame.headers['message']);
      if (frame.body) {
        console.error('STOMP error details:', frame.body);
      }
      // Retry connection
      connectToStomp();
    };

    client.current.activate();
    // setStompClient(client.current);
  };

  const subscribe = (destination) => {
    client.current.subscribe(destination, (greeting) => {
      const response = JSON.parse(greeting.body);
      const destination = response.dest;

      const dests = destination.split('/');

      // 메세지 수신시 메세지 처리 부분
      // 메세지의 목직지에 따라 다른 처리를 함

      if (dests[1] === 'updateBlock') {
        console.log('==========================');
        console.log('update blockIds', blockIds);
        console.log('update blockContents', blockContents);
        console.log('update blockArticleVersion', articleVersion);
        receiveUpdateBlock(response.result);
      } else if (dests[1] === 'createBlock') {
        console.log('==========================');
        console.log('create blockIds', blockIds);
        console.log('create blockContents', blockContents);
        console.log('create blockArticleVersion', articleVersion);
        receiveCreateBlock(response.result);
      } else if (dests[1] === 'deleteBlock') {
        console.log('==========================');
        console.log('delete blockIds', blockIds);
        console.log('delete blockContents', blockContents);
        console.log('delete blockArticleVersion', articleVersion);
        receiveDeleteBlock(response.result);
      } else if (dests[1] === 'updateTitle') {
        receiveUpdateTitle(response.result);
      } else if (dests[1] === 'updateHashtags') {
        receiveUpdateHashtags(response.result);
      }

      // console.log('Received: ' + greeting.body);
    });
  };

  // 해시태그 업데이트 요청 정의
  const updateHashtag = (tagInput, type) => {
    console.log('해시태그 업데이트 요청: ', tagInput);

    // 서버에 메세지 발행
    client.current.publish({
      destination: `/app/updateHashtags/${postID}`,
      body: JSON.stringify({
        uuid: 'testtest',
        userID: userID,
        dto: {
          articleID: postID,
          articleVersion: articleVersion,
          operationType: type, //또는 DELETE
          entityType: 'HASHTAG',
          tagName: tagInput,
          updated_by: {
            updater_id: userID,
            updated_at: new Date().toISOString(),
          },
        },
      }),
    });
  };

  // 블록 데이터를 저장
  const storeBlockData = (blockList) => {
    // 블럭 아이디 및 내용을 저장
    const ids = [];
    const contents = [];

    blockList.forEach((block) => {
      ids.push(block.id);
      contents.push(block.content);
    });

    setBlockIds(ids);
    setBlockContents(contents);
  };

  // 블럭 생성 요청 정의
  const createBlock = () => {
    client.current.publish({
      destination: `/app/createBlock/${postID}`,
      body: JSON.stringify({
        uuid: 'testtest',
        userID: userID,
        dto: {
          articleVersion: articleVersion,
          blockType: 'testBlockType',
          position: blockIds.length,
          content: editorHtml1, // 배열의 요소를 문자열로 변환
          // 'content': blockContents.toString(), // array to string 필요
          blockParent: {
            type: 'testType',
            page_id: 'testPageId',
          },
          created_by: {
            creator_id: userID,
            created_at: new Date().toISOString(),
          },
        },
      }),
    });
  };

  // 블럭 생성 메세지 수신
  const receiveCreateBlock = (dto) => {
    console.log('receiveCreateBlock:', dto);
    // console.log('blockIds:', blockIds);

    setBlockIds((prev) => [
      // console.log('prev', prev),
      ...prev.slice(0, dto.position),
      dto.blockDTO.id,
      ...prev.slice(dto.position),
    ]);
    setBlockContents((prev) => [
      ...prev.slice(0, dto.position),
      dto.blockDTO.content,
      ...prev.slice(dto.position),
    ]);
    setArticleVersion(dto.articleVersion);
  };

  // 블럭 내용 업데이트 요청 정의
  const updateBlock = (operationType, blockId, position, content) => {
    // blockId 상태 변수 사용
    let entityType = '';
    let operationType2 = '';

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

    client.current.publish({
      destination: `/app/updateBlock/${postID}`,
      body: JSON.stringify({
        uuid: 'testtest',
        userID: userID,
        dto: {
          blockId: blockId,
          articleVersion: articleVersion,
          entityType: entityType,
          operationType: operationType2,
          position: position,
          content: content, // 에디터의 내용을 content로 사용
          updated_by: {
            updater_id: userID,
            updated_at: new Date().toISOString(),
          },
        },
      }),
    });
  };

  // 블럭 업데이트 메세지 수신 및 로직 정의
  const receiveUpdateBlock = (dto) => {
    console.log('receiveUpdateBlock:', dto);

    // 게시글에 대한 편집 내용을 수신하면 해당 버전에 맞게 로컬 게시글 버전을 업데이트 해야함
    // 만약 네트워크 속도로 인해 낮은 버전이 먼저 도착하면 무시해야함
    setArticleVersion(dto.articleVersion);

    // console.log('업데이트 수신 blockIds:', blockIds);
    // console.log('업데이트 dto.blockId:', dto.blockId);
    const index = blockIds.indexOf(dto.blockId);
    // console.log('index:', index);
    // console.log('editingIndex:', editingIndex);

    // 업데이트 메소드에 따라 다른 작업 수행
    // TAG는 블록 내용을 완전히 교체함
    if (dto.entityType === 'TAG') {
      setBlockContents((prev) => {
        const newContents = [...prev];
        newContents[index] = dto.content;
        return newContents;
      });
    }
    // INSERT는 블록 내용에 추가함
    // position변수는 충돌이 발생하면 서버에서 OT알고리즘으로 적절히 수정해주기때문에
    // position 위치에 content를 입력하면 된다.
    else if (dto.operationType === 'INSERT') {
      setBlockContents((prev) => {
        const newContents = [...prev];
        newContents[index] = (newContents[index] || '') + dto.content;
        return newContents;
      });
    }
    // DELTE는 블록 내용에서 삭제함
    // position위치로부터 content길이만큼 삭제하면 된다.
    else if (dto.operationType === 'DELETE') {
      setBlockContents((prev) => {
        const newContents = [...prev];
        console.log('삭제 newContents[index]:', newContents[index]);
        console.log('삭제 dto.position:', dto.position);
        console.log('삭제 길이', dto.content.length);
        console.log(
          '삭제 newContents[index].slice(0, dto.position):',
          newContents[index].slice(0, dto.position)
        );
        newContents[index] =
          newContents[index].slice(0, dto.position) +
          newContents[index].slice(dto.position + dto.content.length);
        return newContents;
      });
    }
  };

  // 블럭 삭제 요청 정의
  const blockDelete = (id) => {
    // 서버에 메세지 발행
    // URL과 DTO는 노션의 명세서를 참고
    client.current.publish({
      destination: `/app/deleteBlock/${postID}`,
      body: JSON.stringify({
        uuid: 'testtest',
        userID: userID,
        dto: id,
      }),
    });
  };

  // 블럭 삭제 메세지 수신
  const receiveDeleteBlock = (dto) => {
    console.log('receiveDeleteBlock:', dto);
    setArticleVersion(dto.articleVersion);
    // setBlockIds((prev) => prev.filter((id) => id !== dto.blockId));
    // setBlockContents((prev) => prev.filter((_, index) => index !== blockIds.indexOf(dto.blockId)));

    const editingIndex = blockIds.indexOf(dto.blockId);
    setBlockIds((prevIds) => {
      const newIds = [...prevIds];
      newIds.splice(editingIndex, 1);
      return newIds;
    });
    setBlockContents((prevContents) => {
      const newContents = [...prevContents];
      newContents.splice(editingIndex, 1);
      return newContents;
    });
    setEditingIndex(null);
  };

  const receiveUpdateTitle = (dto) => {
    console.log('receiveUpdateTitle:', dto);
    setArticleVersion(dto.articleVersion);
    if (dto.operationType === 'INSERT') {
      setArticleTitle((prev) => {
        var newTitle = (prev || '') + dto.content;
        return newTitle;
      });
    } else if (dto.operationType === 'DELETE') {
      setArticleTitle((prev) => {
        var newTitle = prev.slice(0, dto.position) + prev.slice(dto.position + dto.content.length);
        return newTitle;
      });
    }
    setTitle(articleTitle);
  };

  const receiveUpdateHashtags = (dto) => {
    console.log('receiveUpdateHashtags:', dto);
    setArticleVersion(dto.articleVersion);
    if (dto.operationType === 'INSERT') {
      setHashtagsList((hashtags) => [...hashtags, dto.tagName]);
    } else if (dto.operationType === 'DELETE') {
      setHashtagsList((hashtags) => hashtags.filter((tag) => tag !== dto.tagName));
    }
    setTags(hashtagsList);
  };

  /*----------------------------------------------------------*/

  // 저장 버튼 클릭 시 실행되는 함수
  const handleCompleteButtonClick = () => {
    // // 저장 버튼을 눌렀을 때 createBlock 요청 + text insert
    // // 취소 완료 버튼이 있을 때는 text insert 이런 것만 가능하게끔
    if (postID && client.current && client.current.connected && blockIds && blockContents) {
      console.log('useEffect createBlock');
      createBlock();
    }

    const editorInstance = editorRef1.current.getInstance();

    // 에디터를 초기화하고 toolbar가 적용된 Editor로 전환
    editorInstance.setMarkdown('');
    setEditingIndex(null);
  };

  const handleDeleteButtonClick = (id, index) => {
    console.log('삭제');
    blockDelete(id);
    // updateBlock('DELETE');
    // setEditingIndex(null); // Reset the editing index
  };

  // 취소 버튼 클릭 시 실행되는 함수
  const handleCancelButtonClick = () => {
    setEditingIndex(null); // 취소 버튼 클릭 시 편집 중인 상태를 초기화
  };

  // 문장 클릭 시 편집 가능하도록 설정하는 함수
  const handleContentClick = (index) => {
    setEditingIndex(index === editingIndex ? null : index);
    updateEditorHtml2(editorRef2.current.getInstance().getMarkdown());
  };

  const handleEditComplete = () => {
    setEditingIndex(null);
  };

  /*----------------------------------------------------------*/

  // 에디터에 작성하면 한 글자씩 마크다운이 적용되어 콘솔에 출력
  const onChange = () => {
    let beforeContent = '';
    let afterContent = '';
    if (editorRef1.current) {
      console.log('----------');

      beforeContent = editorHtml1;
      afterContent = editorRef1.current.getInstance().getMarkdown();
      updateEditorHtml1(editorRef1.current.getInstance().getMarkdown());
      return;
    } else if (editorRef2.current) {
      console.log('----------');
      beforeContent = editorHtml2;
      afterContent = editorRef2.current.getInstance().getMarkdown();
      updateEditorHtml2(editorRef2.current.getInstance().getMarkdown());
    }
    console.log('이전 beforeContent:', beforeContent, beforeContent.length);
    console.log('현재 afterContent:', afterContent, afterContent.length);

    //글자가 추가 되었을 때
    if (afterContent.length > beforeContent.length) {
      const changed = findInsertionIndices(beforeContent, afterContent);
      console.log(
        '글자 여러개 추가',
        afterContent.slice(changed.startIndex, changed.endIndex),
        '바뀐 위치',
        changed.startIndex,
        '추가된 길이',
        changed.endIndex - changed.startIndex,
        '추가된 블럭',
        blockIds[editingIndex]
      );

      updateBlock(
        'INSERT',
        blockIds[editingIndex],
        changed.startIndex,
        afterContent.slice(changed.startIndex, changed.endIndex)
      );
      return;
    } else if (beforeContent.length > afterContent.length) {
      const deleted = findDeletionIndices(beforeContent, afterContent);
      console.log('삭제된 인덱스', deleted);
      console.log('삭제된 부분', beforeContent.slice(deleted.startIndex, deleted.endIndex));
      console.log('삭제된 블럭', blockIds[editingIndex]);
      console.log('삭제된 길이', deleted.endIndex - deleted.startIndex);
      updateBlock(
        'DELETE',
        blockIds[editingIndex],
        deleted.startIndex,
        deleted.endIndex - deleted.startIndex
      );
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          // value={title}
          value={articleTitle}
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
        <IconButton onClick={() => setupWebSocket()}>
          <Iconify icon="heroicons:signal-16-solid" />
        </IconButton>
      </div>
      <hr
        style={{ width: '5%', margin: '6px 0', borderTop: '3px solid black', marginLeft: '0.8%' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        {hashtagsList.map((hashtag, index) => (
          <div
            key={hashtag}
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
            onClick={() => handleTagClick(hashtag)}
          >
            {hashtag}
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
          onClick={blockContents.length > 0 ? handleAiTagClick : null}
          sx={{
            bgcolor: '#8A94EF',
            borderRadius: 3,
            color: 'white',
            fontSize: '18px',
            display: 'flex',
            gap: 1,
          }}
        >
          <Iconify icon="fa6-solid:hashtag" sx={{ width: '25px', height: '25px' }} />
          <Typography variant="body1">AI 태그</Typography>
        </Button>
      </div>

      {/* 편집할 때, 에디터 컴포넌트 (취소,완료 버튼 있는) */}
      {blockIds.map((blockId, index) => (
        <Box
          key={index}
          sx={{ marginBottom: '10px', position: 'relative', cursor: 'pointer' }}
          onClick={() => index !== editingIndex && handleContentClick(index)} // 문장 클릭 시 편집 가능하도록 설정
        >
          {editingIndex === index ? (
            <Stack>
              <Editor
                previewStyle="vertical"
                initialValue={blockContents[index]}
                toolbarItems={toolbar}
                height="300px"
                plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
                ref={editorRef2}
                onChange={onChange}
                hooks={{
                  addImageBlobHook: async (blob, callback) => {
                    console.log(blob);

                    const formData = new FormData();
                    formData.append('files', blob);

                    console.log(callback);

                    try {
                      const response = await PostObjectUpload(formData);
                      console.log('md-editor: ', response);

                      const imageUrl = response.data;
                      console.log('upload response: ', imageUrl);
                      callback(imageUrl, 'Uploaded image');
                    } catch (error) {
                      console.error('Failed to upload image', error);
                    }
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={() => handleDeleteButtonClick(blockIds[index], index)}
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
            <Viewer initialValue={blockContents[index]} />
          )}
        </Box>
      ))}

      {/* 편집할 때, 에디터 컴포넌트 (취소,완료 버튼 있는) */}

      {editingIndex === null && (
        <>
          <Editor
            previewStyle="vertical"
            initialEditType="markdown"
            toolbarItems={toolbar}
            height="300px"
            plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
            ref={editorRef1}
            onChange={onChange}
            hooks={{
              addImageBlobHook: async (blob, callback) => {
                console.log(blob);

                const formData = new FormData();
                formData.append('files', blob);

                console.log(callback);

                try {
                  const response = await PostObjectUpload(formData);
                  console.log('md-editor: ', response);

                  const imageUrl = response.data;
                  console.log('upload response: ', imageUrl);
                  callback(imageUrl, 'Uploaded image');
                } catch (error) {
                  console.error('Failed to upload image', error);
                }
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => {
                handleCompleteButtonClick();
                // createBlock();
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
