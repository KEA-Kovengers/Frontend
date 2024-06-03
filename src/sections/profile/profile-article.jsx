import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { colors } from '../../theme/variableColors';
import { styled } from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function ProfileArticle({
  id,
  thumbnail,
  title,
  content,
  date,
  isLike,
  likecnt,
  commentcnt,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd hh:mm', { locale: ko });
  };

  const navigate = useNavigate();
  // console.log('thumbnail', thumbnail);

  return (
    <RowStyled>
      <ThumbnailStyled
        onClick={() => navigate(`/article/${id}`)}
        component={thumbnail.type.toLowerCase() === 'video' ? 'video' : 'img'}
        src={thumbnail.url}
        autoPlay={thumbnail.type.toLowerCase() === 'video'}
        muted={thumbnail.type.toLowerCase() === 'video'} // Add this line to mute the video by default
        loop={thumbnail.type.toLowerCase() === 'video'} // Add this line to loop the video by default
      />
      <div
        style={{
          alignContent: 'start',
          flexDirection: 'column',
          display: 'flex',
          width: '48%',
          height: 'auto',
          // border: '1px solid blue',
        }}
      >
        <TitleStyled component={Link} to={`/article/${id}`} variant="subtitle">
          {title}
        </TitleStyled>
        <ContentStyled>{content}</ContentStyled>
        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            height: '30px',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <div style={{ fontSize: '15px', color: colors.textGrey }}>{formatDate(date)}</div>
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Iconify
              icon={isLike ? 'gridicons:heart' : 'ph:heart'}
              sx={{
                width: '15px',
                height: '15px',
                color: isLike ? '#FF5631' : '#637381',
                marginRight: 1,
              }}
            />
            <div style={{ marginRight: '8px', fontSize: '15px', color: colors.textGrey }}>
              {likecnt}
            </div>
            <Iconify
              icon={'iconoir:chat-bubble'}
              sx={{ width: '17px', height: '15px', mr: 1, color: colors.textGrey }}
            />
            <div style={{ fontSize: '17px', color: colors.textGrey }}>{commentcnt}</div>
          </div>
        </div>
      </div>
    </RowStyled>
  );
}

ProfileArticle.propTypes = {
  imgurl: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  isLike: PropTypes.bool,
  likecnt: PropTypes.number,
  isComment: PropTypes.bool,
  commentcnt: PropTypes.number,
};

export const RowStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 75%;
  align-items: center;
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: center;
  height: 250px;
`;

export const ThumbnailStyled = styled(Box)`
  width: 48%;
  height: 90%;
  object-fit: cover;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
export const TitleStyled = styled(Typography)`
  font-size: 23px;
  margin-bottom: 10px;
  color: ${colors.blueBlack};
  text-decoration: none;
  cursor: pointer;

  display: -webkit-box;
  -webkit-line-clamp: 2; /* 표시할 줄 수 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1;

  &:hover {
    text-decoration: underline;
  }
`;

export const ContentStyled = styled.div`
  font-size: 15px;
  height: 110px;
  /* width: 100%; */
  /* border: 1px solid red; */
  margin: 5px 0;
  color: ${colors.textGrey};
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;
