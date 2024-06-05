import React, { useCallback, useState, useEffect } from 'react';
import { Box, Container, Stack, Button, Typography, AppBar, Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import { HEADER } from '../../../layouts/dashboard/config-layout';
import Logo from 'src/components/logo';
import { useNavigate } from 'react-router-dom';

import CollabProfile from '../header/collab-profile';
import ModifyPopover from '../header/modify-popover';
import InvitePopover from '../header/invite-popover';
import { GetEditorList } from 'src/api/editor.api';
import { GetUserInfo } from 'src/api/user.api';
import MdEditorWithHeader from '../editor/md-editor';
// import { WebSocketProvider } from '../websocket/WebSocketManager';

// /posts/{postID} && /posts/createPost api 연결
import { GetPostID, PostCreate } from 'src/api/posts.api';
import { Client } from '@stomp/stompjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { set } from 'lodash';
import { useAccountStore } from 'src/store/useAccountStore';

export default function BlogView() {
  const navigate = useNavigate();

  const headerHeight = HEADER.H_MOBILE;
  const globalTheme = useTheme();
  const lgUp = useResponsive('up', 'lg');

  // articleID 고정
  // const userID = 3491829283;
  const { accountInfo } = useAccountStore();
  const userID = accountInfo.id;
  const articleID = '3';

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [postID, setPostID] = useState('');
  const [accounts, setAccounts] = useState([]);
  const onChangeContents = useCallback((value) => {
    setTitle(value.title);
    setTags(value.tags);
  }, []);

  // get postid로 articleVersion 가져오고
  // 웹소켓 연결
  // createPost API 요청 → 상태는 edit으로 변경
  // 근데 GetPostID로 가져오면 상태가 이미 edit임!

  // 사이드 바에서 글쓰기 버튼을 누르면 createPost API 요청
  // 상태는 edit으로 변경
  // 글쓰기 페이지로 이동

  // EDIT
  const createPostEdit = async () => {
    try {
      const requestBody = {
        thumbnail: [
          {
            "url": "",
            "type": "IMAGE"
          }
        ],
        title: "",
        body: "",
        hashtags: [],
        // status: 'EDIT',
      };

      const response = await PostCreate(requestBody);
      console.log('EDIT Response:', response);

      if (response.data && response.data.isSuccess) {
        const postID = response.data.result.id;
        console.log('Post created with postID:', postID);
        setPostID(postID);
        GetEditorlist(postID);
      } else {
        console.error('API response was not successful');
      }
    } catch (error) {
      console.error("There has been a problem with your createPostEdit fetch operation: ", error);
    }
  };
  const GetEditorlist = (postid) => {
    GetEditorList(postid).then((res) => {
      // console.log('GETEDITORLIST', res.data.result.userID);
      { res.data.result.userID.map((userID) => Getuserinfo(userID)) }
      // console.log('USERINFO', userInfo);
      setAccounts(res.data.result);
      // console.log('accounts', accounts);
    }
    ).catch((err) => {
      console.log(err);
    })
  }
  const [userInfo, setUserInfo] = useState([]);
  const Getuserinfo = (userID) => {
    GetUserInfo(userID).then((res) => {
      // console.log('userid', res.data.result);
      setUserInfo(res.data.result);
    }
    ).catch((err) => {
      console.log(err);
    })

  }

  useEffect(() => {
    createPostEdit();
  }, []);

  const renderContent = (
    <Stack direction="row" alignItems="center" spacing={1}>
      {/* <CollabProfile userInfo={userInfo} /> */}
      <InvitePopover />
      <ModifyPopover />
    </Stack>
  );

  const renderHeader = (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: headerHeight,
        width: '100%',
        zIndex: globalTheme.zIndex.appBar + 1,
        backgroundColor: globalTheme.palette.background.default,
        transition: globalTheme.transitions.create(['height'], {
          duration: globalTheme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: '100%',
          height: HEADER.H_DESKTOP,
          borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
        }),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pr: { lg: 1 }

        }}
      >
        <Logo sx={{ mt: 3, ml: 2 }} />
        <Toolbar sx={{ height: 1 }}>
          {renderContent}
          <Button
            onClick={() => {
              navigate('/select-thumbnail',
                {
                  state: {
                    title,
                    tags,
                    postID,
                  },
                })
            }}
            sx={{
              width: 54,
              height: 40,
              bgcolor: '#1A2CDD',
              borderRadius: 3,
              color: 'white',
              fontSize: '18px',
              margin: '13px',
            }}
          >
            {/* 완료 버튼을 누르면 createPost api status POST로 */}
            <Typography variant="body1" sx={{ fontSize: '16px' }}>
              완료
            </Typography>
          </Button>
        </Toolbar>
      </Box>
    </AppBar>
  );

  // console.log('blog-view title: ', title);
  // console.log('blog-view tags: ', tags);
  // console.log('blog-view postID: ', postID);

  return (
    <>
      {renderHeader}
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box mt={9.5}>
              {/* <WebSocketProvider postID={postID}> */}
              <MdEditorWithHeader
                userID={userID} postID={postID}
                title={title} setTitle={setTitle}
                tags={tags} setTags={setTags}
                onChangeContents={onChangeContents} />
              {/* </WebSocketProvider> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
