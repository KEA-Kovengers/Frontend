import React, { useState, useRef, useEffect } from 'react';
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


export default function MdEditorWithHeader() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const [contents, setContents] = useState([]);

  const [editingIndex, setEditingIndex] = useState(null); // 수정 중인 문장의 인덱스

  const tagRef = useRef(null);

  const editorRef1 = useRef(null);
  const editorRef2 = useRef(null);
  const { editorHtml1, editorHtml2, updateEditorHtml1, updateEditorHtml2 } = 
          useEditStore((state) => ({
            editorHtml1: state.editInfo.editorHtml1,
            editorHtml2: state.editInfo.editorHtml2,

            updateEditorHtml1: state.updateEditInfo.bind(null, 'editorHtml1'),
            updateEditorHtml2: state.updateEditInfo.bind(null, 'editorHtml2'),
            aiGeneratedText: state.editInfo.aiGeneratedText,
            handleAiText: state.handleAiText,
          }));

  // const [accessToken, setAccessToken] = useState(''); // [임시] accessToken 상태값

  // useEffect(() => {
  //   var authParams = {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //    };
  //    fetch('https://172.16.211.21/articles/object/upload', authParams)
  //     .then(result => result.json())
  //     .then(accessToken => setAccessToken(accessToken))
  // }, []);

  // console.log('accessToken', accessToken);
  // console.log('accessToken', data);

  // useEffect(() => {
  //   // API Aceess Token 받아오기
  //   var authParams = {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
  //   };
  //   fetch('https://accounts.spotify.com/api/token', authParams)
  //       .then(result => result.json())
  //       .then(data => setAccessToken(data.access_token))
  // }, [])

  /*----------------------------------------------------------*/

  // 제목 입력창의 너비를 동적으로 조절하는 함수
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
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
      if (newTag) {
        setTags([...tags, newTag]);
        setTagInput('');
      }
    }
  };

  // 태그 삭제 버튼 클릭 시 실행되는 함수
  const handleTagClick = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
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

  // useEffect(() => {
  //   console.log("useEffect triggered with editingIndex:", editingIndex);

  //   if (editingIndex === null) {
  //     const editorInstance = editorRef.current.getInstance();
  //     editorInstance.setMarkdown('');
  //     handleContentClick(null);
  //   }
  // }, [editingIndex]);

  // contents 배열이 업데이트될 때마다 실행되는 useEffect
  useEffect(() => {
    console.log(contents.length);
    console.log('useEffect triggered with contents:', contents);
  }, [contents]);
  
  /*----------------------------------------------------------*/

  // 에디터에 작성하면 한 글자씩 마크다운이 적용되어 콘솔에 출력
  const onChange = () => {
    if (editorRef1.current) {
      const editorHtml1 = editorRef1.current.getInstance().getMarkdown();
      updateEditorHtml1(editorHtml1);
      console.log(editorHtml1);
    }

    if (editorRef2.current) {
      const editorHtml2 = editorRef2.current.getInstance().getMarkdown();
      updateEditorHtml2(editorHtml2);
      console.log(editorHtml2);
    }
  }

  // // ai 텍스트 생성 버튼 클릭 시 실행되는 함수
  
  // // 최종 버전
  // const handleAiTextClick = () => {
  //   const textToUse = editorHtml1 || editorHtml2;
  //   if (!textToUse) {
  //     console.log('No text available for AI text generation');
  //     return;
  //   }
  //   handleAiText(textToUse);
  // };

  // 최종 버전
  // useEffect(() => {
  //   if (aiGeneratedText) {
  //     if (editorRef1.current) {
  //       const editorInstance = editorRef1.current.getInstance();
  //       editorInstance.insertText(`\n${aiGeneratedText}`);
  //       updateEditInfo('editorHtml1', editorInstance.getMarkdown());
  //     }
  //     else if (editorRef2.current) {
  //       const editorInstance2 = editorRef2.current.getInstance();
  //       editorInstance2.insertText(`\n${aiGeneratedText}`);
  //       updateEditInfo('editorHtml2', editorInstance2.getMarkdown());
  //     }
  //   }
  // }, [aiGeneratedText, updateEditInfo]);
  
  /*----------------------------------------------------------*/

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
      <hr
        style={{ width: '5%', margin: '6px 0', borderTop: '3px solid black', marginLeft: '0.8%' }}
      />
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
            // width: '80%',
            // backgroundColor: 'pink'
          }}
          ref={tagRef}
        />
        <Button
          onClick={contents.length > 0 ? handleAiTagClick : null}
          // onClick={handleAiTextClick}
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

      {/* <Button
        onClick={editorHtml1.length > 0 || editorHtml2.length > 0 ? handleAiTextClick : null}
        // onClick={editorHtml1.length > 0 || editorHtml2.length > 0 ? handleAiTextClickInternal : null}
        // onClick={handleAiTextClickInternal}
        sx={{
          // width: 54,
          height: 40,
          bgcolor: 'grey',
          borderRadius: 3,
          // border: '2px solid #8A94EF',
          color: 'white',
          fontSize: '18px',
          marginBottom: '10px',
        }}
      >
        <Typography variant="body1" sx={{ fontSize: '16px' }}>
          ai 텍스트 생성
        </Typography>
      </Button> */}

      {/* <AutoIcon editorHtml1={editorHtml1} editorHtml2={editorHtml2} handleAiTextClick={handleAiTextClick} /> */}

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
                    formData.append('file', blob);
        
                    console.log(callback);
        
                    try{
                      const response = await axios.post('http://172.16.211.42/articles/object/upload', formData, {
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
        toolbarItems={toolbar}
        height="300px"
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        ref={editorRef1}
        onChange={onChange}

        hooks={{
          addImageBlobHook: async(blob, callback) => {
            console.log(blob);

            const formData = new FormData();
            formData.append('file', blob);

            console.log(callback);

            try{
              const response = await axios.post('http://172.16.211.21/articles/object/upload', formData, {
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