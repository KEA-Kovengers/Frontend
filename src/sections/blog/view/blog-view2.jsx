import React, { useCallback, useState, useEffect } from 'react';
import { Box, Container, Stack, Button, Typography, AppBar, Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import { HEADER } from '../../../layouts/dashboard/config-layout';
import Logo from 'src/components/logo';
import { useNavigate, useParams } from 'react-router-dom';
import { GetPostDetail } from 'src/api/posts.api';
import CollabProfile from '../header/collab-profile';
import ModifyPopover from '../header/modify-popover';
import InvitePopover from '../header/invite-popover';
import { GetEditorList } from 'src/api/editor.api';
import { GetUserInfo } from 'src/api/user.api';
import MdEditorWithHeader from '../editor/md-editor';

// /posts/{postID} && /posts/createPost api 연결
import { GetPostID, PostCreate } from 'src/api/posts.api';
import { Client } from '@stomp/stompjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { set } from 'lodash';
import CollaborateEditor from '../editor/CollaborateEditor';

export default function BlogView2() {
  const params = useParams();
  const postId = Number(params.id);
  const navigate = useNavigate();

  const headerHeight = HEADER.H_MOBILE;
  const globalTheme = useTheme();
  const lgUp = useResponsive('up', 'lg');

  const userID = 3491829283;
  const articleID = '1';
  const [articleVersion, setArticleVersion] = useState('0.0');

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [postID, setPostID] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const onChangeContents = useCallback((value) => {
    setTitle(value.title);
    setTags(value.tags);
  }, []);

  const postArticle = () => {
    PostEdit(data)
      .then((res) => {
        console.log('postArticle', res);
      })
      .catch((err) => {
        console.log('postArticle', err);
      });
  };

  const GetEditorlist = async () => {
    try {
      const res = await GetEditorList(postId);
      console.log('GETEDITORLIST', res.data.result.userID);

      const userIDs = res.data.result.userID;
      const userInfoPromises = userIDs.map((userID) => GetUserInfo(userID));
      const userInfoResponses = await Promise.all(userInfoPromises);

      const userInfoData = userInfoResponses.map((res) => res.data.result);
      setUserInfo(userInfoData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetEditorlist();
  }, [postId]);

  const renderContent = (
    <Stack direction="row" alignItems="center" spacing={1}>
      <CollabProfile userInfo={userInfo} />
      <InvitePopover postID={postId} />
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
          pr: { lg: 1 },
        }}
      >
        <Logo sx={{ mt: 3, ml: 2 }} />
        <Toolbar sx={{ height: 1 }}>
          {renderContent}
          <Button
            onClick={() => {
              navigate('/select-thumbnail', {
                state: {
                  title,
                  tags,
                  postId,
                },
              });
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
            <Typography variant="body1" sx={{ fontSize: '16px' }}>
              완료
            </Typography>
          </Button>
        </Toolbar>
      </Box>
    </AppBar>
  );

  return (
    <>
      {renderHeader}
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box mt={9.5}>
              <CollaborateEditor
                postID={postId}
                title={title}
                setTitle={setTitle}
                tags={tags}
                setTags={setTags}
                onChangeContents={onChangeContents}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
