import ArticleKakaoMap from './article-kakao-map';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { styled } from 'styled-components';

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

export default function ArticleContent({ post, user }) {
  return (
    <Wrapper>
      {post.blockList &&
        post.blockList.map((block) => {
          // console.log('block:', block.content);
          // console.log('block 업데이트 유저:', block.updated_by.updater_id);
          return (
            <div
              style={{
                color: 'black',
                width: '100%',
                textAlign: 'start',
                marginBottom: 5,
                backgroundColor: user === block.updated_by.updater_id && '#fff8b6',
              }}
            >
              <Viewer initialValue={block.content} />
            </div>
          );
        })}

      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        {post.hashtags &&
          post.hashtags.map((tag) => (
            <span style={{ fontSize: 12, marginRight: 4, color: 'grey' }} key={tag}>
              #{tag}
            </span>
          ))}
      </div>
    </Wrapper>
  );
}
