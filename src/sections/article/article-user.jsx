import { account } from 'src/_mock/account';
import Avatar from '@mui/material/Avatar';

export default function ArticleUser() {
    const displayName = account.displayName || '';

    return (
        <div style={{ borderBottom: '1px solid #C1C1C1', borderRadius: '0px 0px 1px 1px', padding: '10px', display: 'flex', alignItems: 'center', marginLeft: "100px", marginRight: "100px", backgroundColor: '#F9F9F9' }}>
            <Avatar src={account.photoURL} alt="photoURL" sx={{ width: 80, height: 80, marginLeft: "10px", marginBottom: "10px" }} />
            <div style={{ marginLeft: '20px' }}>
                <span style={{ fontSize: '24px' }}>{displayName}</span>
            </div>
        </div>
    );
}
