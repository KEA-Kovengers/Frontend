import { account4 } from 'src/_mock/account';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { Stack } from '@mui/material';

export default function ArticleUser({ editorList }) {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      spacing={2}
      style={{
        borderBottom: '1px solid #C1C1C1',
        borderRadius: '0px 0px 1px 1px',
        // padding: '10px',
        display: 'flex',
        alignItems: 'center',
        marginLeft: '100px',
        marginRight: '100px',
        paddingTop: '25px',
        paddingBottom: '25px',
      }}
    >
      {editorList.map((editor, index) => (
        <Tooltip title={editor.nickName} key={index}>
          <Avatar
            src={editor.profileImg}
            onClick={() => navigate(`/user/${editor.id}`)}
            sx={{
              width: 70,
              height: 70,
              '&:hover': { opacity: 0.72 },
              cursor: 'pointer',
            }}
          />
        </Tooltip>
      ))}
    </Stack>
  );
}
