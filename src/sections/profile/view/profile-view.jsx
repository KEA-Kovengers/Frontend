import { SpaceBar } from "@mui/icons-material";
import UserInfo from "../profile-user-info";
import { useState } from 'react';
export default function ProfileView() {
    const [selectAll, setSelectAll] = useState('전체게시글');
    const [selectFolder, setSelectFolder] = useState('폴더');
    const [selectActivity, setSelectActivity] = useState('활동');
    const handleSelect = (value) => {

    };

    const select_style = {
        fontSize: '20px',
        cursor: 'pointer',
    };

    return (
        <div style={{ flexDirection: 'column', display: 'flex' }}>
            <UserInfo />
            <div style={{ display: 'flex', width: '50%', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'pink', marginTop: '20px' }}>
                <span style={select_style} onClick={() => handleSelect('전체게시글')}>전체게시글</span>
                <span style={select_style} onClick={() => handleSelect('폴더')}>폴더</span>
                <span style={select_style} onClick={() => handleSelect('활동')}>활동</span>
            </div>
        </div>
    );

}
