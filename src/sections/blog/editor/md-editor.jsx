import React, { useState, useRef, useEffect } from 'react';
import { Stack, Box, Button, Typography, colors } from '@mui/material';
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
import { PostGenerateHashtag, PostGenerateText } from 'src/api/ai.api';
import { set } from 'lodash';

export default function MdEditorWithHeader() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const [contents, setContents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // 수정 중인 문장의 인덱스

  const tagRef = useRef(null);
  const editorRef1 = useRef(null);
  const editorRef2 = useRef(null);

  /*----------------------------------------------------------*/

  useEffect(() => {
    if (tagRef.current && tagInput) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = window.getComputedStyle(tagRef.current).fontSize + 'px sans-serif';
      const width = context.measureText(tagInput).width;
      tagRef.current.style.width = `${width}px`;
    }
  }, [tagInput]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTagInput(event.target.value);
  };

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

  const handleAiTextClick = () => {
    const text = contents.join(' ');
    console.log('text', text);
    PostGenerateText(text)
      .then((res) => {
        console.log('res', res.data);
        setContents([...contents, res.data]);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  /*----------------------------------------------------------*/
  const handleTagClick = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    console.log('tags', tags);
  };

  const handleCompleteButtonClick = () => {
    const editorInstance = editorRef1.current.getInstance();
    const currentContent = editorInstance.getMarkdown();
    setContents([...contents, currentContent]);

    console.log('저장');
    editorInstance.setMarkdown('');
  };

  const handleCancelButtonClick = () => {
    setEditingIndex(null); // 취소 버튼 클릭 시 편집 중인 상태를 초기화
  };

  const handleContentClick = (index) => {
    setEditingIndex(index === editingIndex ? null : index);
  };

  const handleEditComplete = () => {
    if (
      editorRef2.current &&
      editorRef2.current.getInstance &&
      editingIndex !== null &&
      editingIndex >= 0 &&
      editingIndex < contents.length
    ) {
      // Get the current content of the editor being edited
      const editedContent = editorRef2.current.getInstance().getMarkdown();
      console.log('editedContent', editedContent);

      const updatedContents = [...contents];
      // Update the content at the specified index with the edited content
      updatedContents[editingIndex] = editedContent;
      // Set the state with the updated contents
      setContents(updatedContents);

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

  useEffect(() => {
    console.log(contents.length);
    console.log('useEffect triggered with contents:', contents);
  }, [contents]);

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
            width: 54,
            height: 40,
            bgcolor: '#8A94EF',
            borderRadius: 3,
            color: 'white',
            fontSize: '18px',
          }}
        >
          <Typography variant="body1" sx={{ fontSize: '13px' }}>
            ai 태그
          </Typography>
        </Button>
      </div>
      <Button
        onClick={contents.length > 0 ? handleAiTextClick : null}
        // onClick={handleAiTextClick}
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
      </Button>
      {contents.map((content, index) => (
        <Box
          key={index}
          sx={{ marginBottom: '10px', position: 'relative', cursor: 'pointer' }}
          onClick={() => index !== editingIndex && handleContentClick(index)} // 문장 클릭 시 편집 가능하도록 설정
          // onClick={() => console.log(content)} // 문장 클릭 시 편집 가능하도록 설정
        >
          {editingIndex === index ? (
            <Stack>
              {editingIndex !== null && (
                <Editor
                  previewStyle="vertical"
                  initialValue={content}
                  placeholder="글을 작성해 주세요"
                  toolbarItems={toolbar}
                  height="300px"
                  plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
                  ref={editorRef2}
                />
              )}
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
            <Viewer initialValue={content} />
          )}
        </Box>
      ))}
      <Editor
        previewStyle="vertical"
        initialEditType="markdown"
        placeholder="글을 작성해 주세요"
        toolbarItems={toolbar}
        height="300px"
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        ref={editorRef1}
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
    </div>
  );
}
