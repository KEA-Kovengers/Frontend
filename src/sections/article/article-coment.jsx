import React, { useState } from "react";

import { account } from 'src/_mock/account';
import Avatar from '@mui/material/Avatar';
import CustomModal from 'src/components/CustomModal/CustomModal';
export default function ArticleComment() {
    const [open, setOpen] = useState(null);
    const displayName = account.displayName || '';
    const bio = account.bio || '';
    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const [isDelModalOpen, setIsModalOpen] = useState(false);

    const [isReModalOpen, setIsReModalOpen] = useState(false);


    const handleOpenModalClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenReModalClick = () => {
        setIsReModalOpen(true);
    };

    const handleCloseReModal = () => {
        setIsReModalOpen(false);
    };

    return (
        <div style={{ marginTop: '30px', borderBottom: '1px solid #E4E8EB', borderRadius: '1px 1px 0px 0px', display: 'flex', flexDirection: 'column', backgroundColor: '#F9F9F9', marginBottom: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', width: "100%" }}>

                    <div style={{ flexDirection: 'row', display: 'flex' }}>

                        <Avatar src={account.photoURL} alt="photoURL" sx={{ width: 40, height: 40, marginLeft: "10px", marginBottom: "10px" }} />
                        <div style={{ marginLeft: '20px', flexDirection: 'column', display: 'flex', textAlign: 'start' }}>
                            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{displayName}</span>
                            <span style={{ fontSize: '10px' }}>{bio}</span>
                        </div>
                    </div>

                    <span style={{ fontSize: '12px', cursor: 'pointer' }} onClick={handleOpenModalClick}>삭제</span>
                    <CustomModal
                        rightButton={'삭제'}
                        // mode={'textfield'}
                        mode={'content'}
                        onClose={handleCloseModal}
                        contents={'댓글을 삭제하시겠습니까?'}
                        open={isDelModalOpen}
                    />
                </div>
                <div style={{ flexDirection: 'column', display: 'flex', width: "100%", marginTop: "15px", alignItems: 'start' }}>
                    <div style={{ fontSize: "14px", color: '#000000', marginBottom: '5px' }}>반가워요 </div>
                    <div style={{ flexDirection: 'row', display: 'flex', width: '23%', justifyContent: 'space-between' }}>

                        <div style={{ fontSize: "12px", color: '#637381', marginBottom: '15px' }}>2024. 03. 15  17:16 </div>
                        <span style={{ fontSize: "12px", color: '#637381', marginBottom: '15px', cursor: 'pointer' }} onClick={handleOpenReModalClick}>신고</span>
                        <CustomModal
                            rightButton={'신고'}
                            // mode={'textfield'}
                            mode={'content'}
                            onClose={handleCloseReModal}
                            contents={'신고하시겠습니까?'}
                            open={isReModalOpen}
                        />
                    </div>
                </div>


            </div>
        </div>
    );
}
