import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { colors } from '../../theme/variableColors';
export default function ProfileArticle({
    imgurl,
    title,
    content,
    date,
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
            <div style={{ marginLeft: '40px', alignContent: 'start', marginTop: '30px', marginBottom: '10px', flexDirection: 'column', display: 'flex', width: '50%' }}>
                <span style={{ fontSize: '25px', marginBottom: '10px' }}>{title}</span>
                <span style={{ fontSize: '15px', color: colors.textGrey }}>{content}</span>
                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>

                    <p>{date}</p>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <p style={{ marginRight: '10px' }}>좋아요 {likecnt}개</p>
                        <p>댓글 {commentcnt}개</p>
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
    likecnt: PropTypes.number,
    commentcnt: PropTypes.number,
};