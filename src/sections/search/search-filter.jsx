import * as React from 'react';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import ProfileArticle2 from '../profile/profile-article2';
import LikeRow from '../article/article-like-row';
import { Table, TableBody, TableContainer } from '@mui/material';
import TableNoData from '../user/TableNoData';
import { useFriendStore } from 'src/store/useFriendStore';
import { useAccountStore } from 'src/store/useAccountStore';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SearchFilter({ query, value, setValue, searchedPosts, searchedUsers }) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { friendsList } = useFriendStore();
  const { accountInfo } = useAccountStore();
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab
            icon={<Iconify icon="majesticons:article-line" />}
            iconPosition="start"
            style={{ height: '10px' }}
            label="게시글"
            {...a11yProps(0)}
          />
          <Tab
            icon={<Iconify icon="ep:user-filled" />}
            iconPosition="start"
            label="닉네임"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'column',
            display: 'flex',
          }}
        >
          {searchedPosts.length > 0 ? (
            searchedPosts.map((article, index) => (
              <ProfileArticle2
                key={index}
                id={article.post_id}
                thumbnail={article.thumbnails[0]}
                title={article.title}
                content={article.body}
                date={article.created_at}

              />
            ))
          ) : (
            <TableNoData query={query} />
          )}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 300 }}>
            {searchedUsers.length > 0 ? (
              searchedUsers.map((row, index) => (
                <LikeRow
                  key={index}
                  id={row.id}
                  name={row.
                    nick_name
                  }
                  company={row.blog_name
                  }
                  isFriend={
                    friendsList.some((friend) => friend.id === row.id) || row.id === accountInfo.id
                  }
                  avatarUrl={row.profile_img
                  }

                />
              ))
            ) : (
              <TableNoData query={query} />
            )}
          </Table>
        </TableContainer>
      </CustomTabPanel>
    </Box>
  );
}

SearchFilter.propTypes = {
  query: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  searchedPosts: PropTypes.array,
  searchedUsers: PropTypes.array,
};
