import React, { useState, useRef, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Button, Typography, colors, IconButton } from '@mui/material';
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
// import { set } from 'lodash';
import axios from 'axios';

import { useEditStore } from 'src/store/useEditStore.js';

// websocket
import { Client } from '@stomp/stompjs';
import 'bootstrap/dist/css/bootstrap.min.css';

const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNDI2NjEyOTM3IiwiaXNzIjoia292ZW5nZXJzIiwiaWF0IjoxNzE2NDUzNjUwLCJleHAiOjE3MTgyNTM2NTB9.nUtA_AQqcV_5445OWdM89pt9eCLpBNIlJvWAz2XmTYY";

// 수정해야하는 부분: 블럭 삭제 버튼

export default function MdEditorWithHeader({ title, setTitle, tags, setTags, onChangeContents }) {

  // const [title, setTitle] = useState('');
  // const [tags, setTags] = useState([]);
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

    const [customToolbar, setCustomToolbar] = useState(toolbar);

    const applyCustomToolbar = () => {
      if (editorRef1.current && editorRef2.current) {
        const instance1 = editorRef1.current.getInstance();
        const instance2 = editorRef2.current.getInstance();
        instance1.setToolbarItems(customToolbar);
        instance2.setToolbarItems(customToolbar);
      }
    };

    // 웹 소켓 연결 및 메세지 수신
    const setupWebsocket = () => {
      const client = new Client({
        brokerURL: 'ws://newcord.kro.kr/ws',
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
    });
  }

    // useEffect를 사용하여 customToolbar 상태가 변경될 때마다 applyCustomToolbar 함수를 호출합니다.
    useEffect(() => {
      applyCustomToolbar();
    }, [customToolbar]);

   // 컴포넌트가 마운트될 때 ref를 업데이트합니다.
   useEffect(() => {
    setEditorRef1(editorRef1.current);
    setEditorRef2(editorRef2.current);
  }, [setEditorRef1, setEditorRef2]);

  /*----------------------------------------------------------*/

  // 제목 입력창의 너비를 동적으로 조절하는 함수
  // const handleTitleChange = (event) => {
  //   setTitle(event.target.value);
  // };
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
      // if (newTag) {
      //   setTags([...tags, newTag]);
      //   setTagInput('');
      // }
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
  };

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

  // contents 배열이 업데이트될 때마다 실행되는 useEffect
  useEffect(() => {
    console.log(contents.length);
    console.log('useEffect triggered with contents:', contents);
  }, [contents]);
  
  /*----------------------------------------------------------*/

  // 에디터에 작성하면 한 글자씩 마크다운이 적용되어 콘솔에 출력
  const onChange = () => {
    if (editorRef1.current) {
      // editorHtml1 = editorRef1.current.getInstance().getMarkdown();
      updateEditorHtml1(editorRef1.current.getInstance().getMarkdown());
      console.log('editorHtml1:', editorHtml1);
    }
    else if (editorRef2.current) {
      // const editorHtml2 = editorRef2.current.getInstance().getMarkdown();
      updateEditorHtml2(editorRef2.current.getInstance().getMarkdown());
      console.log('editorHtml2: ',editorHtml2);
    }
  }
  
  /*----------------------------------------------------------*/

  console.log('title:', title);
  console.log('tags:', tags);
  console.log('contents:', contents);

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
                toolbarItems={customToolbar}
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
                      const response = await axios.post('http://newcord.kro.kr/articles/object/upload', formData, {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                        },
                      });
        
                      const imageUrl = response.data;
                      console.log(imageUrl);
                      callback(imageUrl, 'Uploaded image');
        
                    }catch (error) {
                      console.error('Failed to upload image', error);
                    }
                  }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
        toolbarItems={customToolbar}
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
              const response = await axios.post('http://newcord.kro.kr/articles/object/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${accessToken}`,
                },
              });

              const imageUrl = response.data;
              console.log(imageUrl);
              callback(imageUrl, 'Uploaded image');

            }catch (error) {
              console.error('Failed to upload image', error);
            }
          }
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={handleCompleteButtonClick}
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