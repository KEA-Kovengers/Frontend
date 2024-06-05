// import PropTypes from 'prop-types';
// import { Button } from '@mui/material';
// import Scrollbar from 'src/components/scrollbar';


// // ----------------------------------------------------------------------

// export default function InviteList({ friends }) {

//     const inviteUser = (postID, userID) => {
//         PostAddEditor(postID, userID).then((res) => {
//             console.log(res);
//         }
//         ).catch((err) => {
//             console.log(err);
//         });
//     }
//     const invite_button = {
//         width: 50,
//         height: 30,
//         bgcolor: '#1A2CDD',
//         borderRadius: 3,
//         color: 'white',
//         fontSize: '15px',
//         fontWeight: 300

//     };
//     return (
//         <Scrollbar style={{ marginTop: '10px', maxHeight: 'calc(100% - 60px)' }}>
//             <div sx={{ flexDirection: 'row', }}>
//                 {friends.map((friend) => (
//                     <div
//                         key={friend.id}
//                         style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'space-between', // 추가된 코드
//                             marginBottom: '10px',
//                         }}
//                     >
//                         <div style={{ display: 'flex', alignItems: 'center' }}>
//                             <img
//                                 src={friend.profileImg}
//                                 alt={friend.nickName}
//                                 style={{
//                                     borderRadius: '50%',
//                                     width: '100%',
//                                     height: '100%',
//                                     maxWidth: '50px',
//                                     maxHeight: '50px',
//                                     marginRight: '10px',
//                                 }}
//                             />
//                             <p style={{ width: '100px' }}>{friend.nickName}</p>
//                         </div>
//                         <Button sx={invite_button} onClick={inviteUser(postID, friend.userID)}>초대</Button>
//                     </div>
//                 ))}
//             </div>
//         </Scrollbar>
//     );
// }

// InviteList.propTypes = {
//     friends: PropTypes.array.isRequired,
// };

import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { useParams } from 'react-router-dom';
import { PostAddEditor } from 'src/api/editor.api';
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

export default function InviteList({ friends, postID }) {
    const params = useParams();
    // const postId = Number(params.id);
    const navigate = useNavigate();
    const inviteUser = (postID, userID) => {
        console.log('postID:', postID);
        console.log('userID:', userID);
        PostAddEditor(postID, userID).then((res) => {
            console.log(res);
            // window.location.reload();
            navigate(`/createEditSession/${postID}`);
        }
        ).catch((err) => {
            console.log(err);
        });
    }
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
        <Scrollbar style={{ marginTop: '10px', maxHeight: 'calc(100% - 60px)' }}>
            <div sx={{ flexDirection: 'row', }}>
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
                                src={friend.profileImg}
                                alt={friend.nickName}
                                style={{
                                    borderRadius: '50%',
                                    width: '100%',
                                    height: '100%',
                                    maxWidth: '50px',
                                    maxHeight: '50px',
                                    marginRight: '10px',
                                }}
                            />
                            <p style={{ width: '100px' }}>{friend.nickName}</p>
                        </div>
                        <Button sx={invite_button} onClick={() => inviteUser(postID, friend.userID)}>초대</Button>
                    </div>
                ))}
            </div>
        </Scrollbar>
    );
}

InviteList.propTypes = {
    friends: PropTypes.array.isRequired,
};
