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
  imgurl,
  title,
  content,
  date,
  isLike,
  likecnt,
  isComment,
  commentcnt,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd hh:mm', { locale: ko });
  };

  const navigate = useNavigate();

  return (
    <RowStyled>
      <ImageStyled onClick={() => navigate(`article/${id}`)} component="img" src={imgurl} />
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
          <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
            <Iconify
              icon={isLike ? 'gridicons:heart' : 'ph:heart'}
              sx={{
                width: '15px',
                height: '15px',
                color: isLike ? '#FF5631' : '#637381',
                marginRight: 1,
              }}
            />
            <p style={{ marginRight: '8px', fontSize: '15px', color: colors.textGrey }}>
              {likecnt}
            </p>
            <Iconify
              icon={isComment ? 'iconoir:chat-bubble-solid' : 'iconoir:chat-bubble'}
              sx={{ width: '17px', height: '15px', marginRight: 1, color: colors.textGrey }}
            />
            <p style={{ fontSize: '17px', color: colors.textGrey }}>{commentcnt}</p>
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

export const ImageStyled = styled(Box)`
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
