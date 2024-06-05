import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableContainer } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import LikeHead from 'src/sections/article/article-like-head';
import LikeRow from 'src/sections/article/article-like-row';
import { GetUserInfo } from 'src/api/user.api';
import { useFriendStore } from 'src/store/useFriendStore';
import { useAccountStore } from 'src/store/useAccountStore';

export default function LikeTable({ users }) {
  console.log('users', users);
  const [userList, setUserList] = useState([]);
  const { friendsList } = useFriendStore();
  const { accountInfo } = useAccountStore();

  useEffect(() => {
    // console.log('users', users);
    setUserList([]);
    users.map((user) => {
      GetUserInfo(user.user_id)
        .then((res) => {
          console.log('유저 정보', res);
          setUserList((prev) => [
            ...prev,
            {
              id: user.user_id,
              nickName: res.data.result.nickName,
              blogName: res.data.result.blogName,
              profileImg: res.data.result.profileImg,
            },
          ]);
        })
        .catch((err) => {
          console.log('유저 정보 에러', err);
        });
    });
  }, [users]);

  return (
    <Scrollbar>
      <TableContainer sx={{ overflow: 'unset' }}>
        <Table sx={{ minWidth: 300 }}>
          {/* Liked people */}
          <LikeHead />
          <TableBody>
            {userList.map((row) => (
              <LikeRow
                key={row.id}
                id={row.id}
                name={row.nickName}
                company={row.blogName}
                isFriend={
                  friendsList.some((friend) => friend.id === row.id) || row.id === accountInfo.id
                }
                avatarUrl={row.profileImg}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
