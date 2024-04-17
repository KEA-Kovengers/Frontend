import { account } from 'src/_mock/account';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { colors } from '../../theme/variableColors';
export default function UserInfo() {
    const displayName = account.displayName || '';
    const bio = account.bio || '';
    return (
        <>
            <div style={{ borderBottom: '1px solid #C1C1C1', borderRadius: '0px 0px 1px 1px', padding: '10px', display: 'flex', alignItems: 'center', marginLeft: "100px", marginRight: "100px", backgroundColor: '#F9F9F9', flexDirection: 'column' }}>
                <div style={{ marginBottom: '50px', fontWeight: 'bold', fontSize: '28px' }}>{account.blogName}</div>
                <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <Avatar src={account.photoURL} alt="photoURL" sx={{ width: 80, height: 80, marginLeft: "10px", marginBottom: "10px" }} />
                        <div style={{ marginLeft: '20px', flexDirection: 'column', display: 'flex' }}>
                            <span style={{ fontSize: '24px' }}>{displayName}</span>
                            <span style={{ fontSize: '13px' }}>친구 {account.friendcnt}명</span>
                            <span style={{ fontSize: '13px', marginTop: '15px' }}>{bio}</span>
                        </div>
                    </div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <IconButton sx={{ mt: '5px', mr: '5px', backgroundColor: colors.third, borderRadius: '15px', marginRight: '10px' }}>
                            <Iconify icon="icon-park-solid:config" sx={{ width: '25px', height: '25px', color: colors.textGrey }} />
                        </IconButton>
                        <IconButton sx={{ mt: '5px', mr: '5px', backgroundColor: colors.third, borderRadius: '15px' }}>
                            <Iconify icon="fa-solid:user-friends" sx={{ width: '25px', height: '25px', color: colors.textGrey }} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    );
}
