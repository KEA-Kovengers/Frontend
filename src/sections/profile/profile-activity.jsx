import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { colors } from '../../theme/variableColors';

import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
// Import the chat icon from another library if needed

export default function ProfileActivity({
    imgurl,
    title,
    content,
    date,
    islike,
    likecnt,
    isComment,
    commentcnt,
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '70%', alignItems: 'center', marginBottom: '30px' }}>
            <Box
                component="img"
                src={imgurl}
                sx={{
                    width: '38%',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    color: 'black'
                }}
            />
            <div style={{ marginLeft: '40px', alignContent: 'start', marginTop: '30px', flexDirection: 'column', display: 'flex', width: '55%', height: '30vh', justifyContent: 'space-between' }}>
                <div style={{ flexDirection: 'column', display: 'flex' }}>
                    <span style={{ fontSize: '25px', marginBottom: '10px' }}>{title}</span>
                    <span style={{ fontSize: '15px', color: colors.textGrey }}>{content}</span>
                </div>

                <div style={{ borderTop: '1px solid #C1C1C1', borderRadius: '0px 0px 1px 1px', flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                    <p style={{ fontSize: '17px', color: colors.textGrey }}>{date}</p>
                    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                        <IconButton disabled color={islike ? '#FF5631' : '#637381'} sx={{ width: "35px", height: "35px" }} >
                            <Iconify icon={islike ? "flat-color-icons:like" : "icon-park-outline:like"} sx={{ width: "17px", height: "15px" }} />
                        </IconButton>
                        <p style={{ marginRight: '8px', fontSize: '17px', color: colors.textGrey }}>{likecnt}</p>
                        <IconButton disabled color={isComment ? '#868E96' : '#637381'} sx={{ width: "35px", height: "35px" }}>
                            <Iconify icon={isComment ? "bi:chat-dots-fill" : "bi:chat-dots"} sx={{ width: "17px", height: "15px" }} />
                        </IconButton>
                        <p style={{ fontSize: '17px', color: colors.textGrey }}>{commentcnt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

ProfileActivity.propTypes = {
    imgurl: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    islike: PropTypes.bool,
    likecnt: PropTypes.number,
    isComment: PropTypes.bool,
    commentcnt: PropTypes.number,
};
