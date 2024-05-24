import { account4 } from 'src/_mock/account';
import Avatar from '@mui/material/Avatar';

import { useNavigate, Link } from 'react-router-dom';
import { Typography } from '@mui/material';

export default function ArticleUser() {
  const navigate = useNavigate();
  const displayName = account4.displayName || '';

  return (
    <div
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
      <Avatar
        src={account4.photoURL}
        onClick={() => navigate('/user')}
        sx={{
          width: 70,
          height: 70,
        }}
      />

      <Typography
        component={Link}
        to="/user"
        sx={{
          marginLeft: '20px',
          color: '#000000',
          fontSize: '18px',
          maxWidth: '75%',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        {displayName}
      </Typography>
    </div>
  );
}
