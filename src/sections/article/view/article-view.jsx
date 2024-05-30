import ArticleTitle from '../article-title';
import ArticleUser from '../article-user';
import ArticleContent from '../article-content';
import AiWidget from '../article-ai-widget';
import ArticleCommunity from '../article-community';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserInfo } from 'src/sections/profile/UserInfo';
import { GetEditorList } from 'src/api/editor.api';
import { GetUserInfo } from 'src/api/user.api';

export default function ArticleView() {
  const params = useParams();
  const postId = Number(params.id);

  const { userInfo, setUserInfo } = useUserInfo();
  const [editorList, setEditorList] = useState([]);

  useEffect(() => {
    const fetchEditors = async () => {
      try {
        const res = await GetEditorList(postId);
        const userIDs = res.data.result.userID;

        const newEditorList = [];

        for (const userId of userIDs) {
          try {
            const response = await GetUserInfo(userId);
            const userInfo = response.data.result;

            // setUserInfo({
            //   id: userId,
            //   nickName: userInfo.nickName,
            //   blogName: userInfo.blogName,
            //   profileImg: userInfo.profileImg,
            //   bio: userInfo.bio,
            //   role: 'USER',
            //   friendCount: 0,
            // });

            newEditorList.push({
              id: userId,
              nickName: userInfo.nickName,
              blogName: userInfo.blogName,
              profileImg: userInfo.profileImg,
              bio: userInfo.bio,
              role: 'USER',
              friendCount: 0,
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log('newEditorList', newEditorList);

        setEditorList(newEditorList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEditors();
  }, [postId]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 'auto',
      }}
    >
      <div
        style={{
          boxShadow: '0px 0px 10px 1px rgba(128, 128, 128, 0.2)',
          height: 'auto',
          width: '70%',
          borderRadius: '10px',
          textAlign: 'center',
          paddingBottom: '30px',
        }}
      >
        <ArticleUser editorList={editorList} />
        <ArticleTitle editorList={editorList} />
        <ArticleContent />
        <AiWidget />
        <ArticleCommunity />
      </div>
    </div>
  );
}
