import ArticleKakaoMap from './article-kakao-map';
import { Viewer } from '@toast-ui/react-editor';
import { styled } from 'styled-components';

import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

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
  // const params = useParams();
  // const postId = Number(params.id);
  // const [posts, setPosts] = useState({});

  // useEffect(() => {
  //   GetPostDetail(postId)
  //     .then((res) => {
  //       console.log('게시글 상세 content', res);
  //       setPosts(res.data.result);
  //     })
  //     .catch((err) => {
  //       console.log('게시글 상세 에러', err);
  //     });
  // }, [postId]);
  const [tags, setTags] = useState([post.hashtags]);
  // console.log('tags:', post.blockList[0].content);

  const [blockList, setBlockList] = useState([post.blockList]);

  useEffect(() => {
    console.log('[content]선택된 유저', user);
  }, [user]);

  return (
    <Wrapper>
      {post.blockList &&
        post.blockList.map((block) => {
          // console.log('block:', block.content);
          console.log('block 업데이트 유저:', block.updated_by.updater_id);
          return (
            <div
              style={{
                fontSize: 16,
                color: 'black',
                backgroundColor: user === block.updated_by.updater_id && 'lightblue',
              }}
            >
              {block.content}
            </div>
          );
        })}

      {/* <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        {tags &&
          tags.map((tag) => (
            <span style={{ fontSize: 12, marginRight: 4, color: 'grey' }} key={tag}>
              #{tag}
            </span>
          ))}
      </div> */}
    </Wrapper>
  );
}
