import ArticleKakaoMap from './article-kakao-map';
import { Viewer } from '@toast-ui/react-editor';
import { styled } from 'styled-components';

import { useState } from 'react';

export const Wrapper = styled.div`
  border-bottom: 1px solid #e4e8eb;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 100px;
  margin-right: 100px;
  padding-top: 20px;
  padding-bottom: 20px;
  /* background-color: pink; */
`;

export default function ArticleContent() {
  const [tags, setTags] = useState(['안녕', '이라고', '합니다']);

  const content = `
**asdfasdfasdfㅁㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㄴㅁㄴㅇ**

> 하하하하ㅏㅎ

* 안녕
* 이라고
* 합니다
***`;
  return (
    <Wrapper>
      <Viewer initialValue={content} />
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        {tags.map((tag) => (
          <span style={{ fontSize: 12, marginRight: 4, color: 'grey' }} key={tag}>
            #{tag}
          </span>
        ))}
      </div>
    </Wrapper>
  );
}
