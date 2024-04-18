import React from 'react';
import { Table, TableBody, TableContainer } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import LikeHead from 'src/sections/article/article-like-head';
import LikeRow from 'src/sections/article/article-like-row';

export default function LikeTable() {

    const userList = [{ name: '이소정', avatarUrl: `/assets/images/avatars/avatar_1.jpg`, company: '소정이의 블로그', isFriend: true }, { name: '김미소', avatarUrl: `/assets/images/avatars/avatar_2.jpg`, company: '미소의 블로그', isFriend: false }, { name: '남소미', avatarUrl: `/assets/images/avatars/avatar_3.jpg`, company: '솜2의 블로그', isFriend: true }, { name: '윤혜원', avatarUrl: `/assets/images/avatars/avatar_4.jpg`, company: '혜원이의 블로그', isFriend: false }, { name: '정성훈', avatarUrl: `/assets/images/avatars/avatar_5.jpg`, company: '성훈이의 블로그', isFriend: true }, { name: '김미소', avatarUrl: `/assets/images/avatars/avatar_2.jpg`, company: '미소의 블로그', isFriend: true }];

    return (

        <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 300 }}>
                    <LikeHead />
                    <TableBody>


                        {userList.map((row) => (
                            <LikeRow
                                key={row.id}
                                name={row.name}
                                company={row.company}
                                isFriend={row.isFriend}
                                avatarUrl={row.avatarUrl}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Scrollbar>


    );
}
