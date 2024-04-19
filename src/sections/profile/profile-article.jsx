import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { colors } from '../../theme/variableColors';

import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
export default function ProfileArticle({
    imgurl,
    title,
    content,
    date,
    like,
    likecnt,
    commentcnt,
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '70%', alignItems: 'center', marginBottom: '30px' }}>
            <Box
                component="img"
                // alt={title}
                src={
                    imgurl
                }
                sx={{
                    //top: '15%',
                    width: '36%',
                    objectFit: 'cover',
                    borderRadius: '20px',
                }}
            />
            <div style={{ marginLeft: '40px', alignContent: 'start', marginTop: '30px', marginBottom: '10px', flexDirection: 'column', display: 'flex', width: '55%', height: 'auto' }}>
                <span style={{ fontSize: '25px', marginBottom: '10px' }}>{title}</span>
                <span style={{ fontSize: '15px', color: colors.textGrey }}>{content}</span>
                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>

                    <p style={{ fontSize: '17px', color: colors.textGrey }}>{date}</p>
                    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                        <IconButton color={like ? '#FF5631' : '#637381'} sx={{ width: "35px", height: "35px" }} >
                            <Iconify icon={like ? "flat-color-icons:like" : "icon-park-outline:like"} sx={{ width: "17px", height: "15px" }} />
                        </IconButton>
                        <p style={{ marginRight: '8px', fontSize: '17px', color: colors.textGrey }}>{likecnt}</p>
                        <IconButton color='#637381' sx={{ width: "35px", height: "35px" }}>
                            <Iconify icon="iconoir:chat-bubble" sx={{ width: "17px", height: "15px" }} />
                        </IconButton>
                        <p style={{ fontSize: '17px', color: colors.textGrey }}>{commentcnt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

ProfileArticle.propTypes = {
    imgurl: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    like: PropTypes.bool,
    likecnt: PropTypes.number,
    commentcnt: PropTypes.number,
};