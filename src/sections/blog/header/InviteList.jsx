import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function InviteList({ friends }) {

    const invite_button = {
        width: 50,
        height: 30,
        bgcolor: '#1A2CDD',
        borderRadius: 3,
        color: 'white',
        fontSize: '15px',
        fontWeight: 300
    };
    return (
        <Scrollbar style={{ marginTop:'10px' ,maxHeight: 'calc(100% - 60px)' }}>
        <div sx={{flexDirection: 'row',}}>
            {friends.map((friend) => (
            <div 
                key={friend.id}
                style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', // 추가된 코드
                marginBottom: '10px',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}> 
                <img 
                    src={friend.photoURL} 
                    alt={friend.name} 
                    style={{
                    borderRadius: '50%',
                    width: '100%',
                    height: '100%',
                    maxWidth: '50px',
                    maxHeight: '50px',
                    marginRight: '10px',
                    }} 
                />
                <p>{friend.name}</p>
                </div>
                <Button sx={invite_button}>초대</Button>
            </div>
            ))}
        </div>
        </Scrollbar>
    );
}

InviteList.propTypes = {
    friends: PropTypes.array.isRequired,
};
