import React, { useRef } from "react";
import PropTypes from 'prop-types';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card, CardMedia, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from 'src/theme/variableColors';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const cardStyle = {
  borderRadius: 0,
  bgcolor: 'background.default',
  width: '100%',
  position: 'relative',
  paddingBottom: '56.25%', // 16:9 ratio
};

const CustomCardMedia = styled(CardMedia)({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
});

export default function AppCardImage({ images }) {

    // 슬라이더 추가
    const sliderRef = useRef(null);
    const settings = {
        arrows: true,
        dots: true,
        dotsClass: "slick-dots",
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow onClick={() => sliderRef.current.slickPrev()} />,
        nextArrow: <CustomNextArrow onClick={() => sliderRef.current.slickNext()} />,
    };

  return (
    <div>
      {images.length > 1 ? (
        <Slider {...settings} ref={sliderRef}>
          {images.map((image, idx) => (
            <Card key={idx} sx={cardStyle}>
              <CustomCardMedia
                component={image.type === 'VIDEO' ? 'video' : 'img'}
                src={image.url}
                alt={`image-${idx}`}
                autoPlay={image.type.toLowerCase() === 'video'}
                muted={image.type.toLowerCase() === 'video'}
                loop={image.type.toLowerCase() === 'video'}
              />
            </Card>
          ))}
        </Slider>
      ) : images.length === 1 ? (
        <Card sx={cardStyle}>
          <CustomCardMedia
            component={images[0].type === 'VIDEO' ? 'video' : 'img'}
            src={images[0].url}
            autoPlay={images[0].type.toLowerCase() === 'video'}
            muted={images[0].type.toLowerCase() === 'video'}
            loop={images[0].type.toLowerCase() === 'video'}
            alt={`image-0`}
          />
        </Card>
      ) : (
        <Card sx={cardStyle}>
          <CustomCardMedia component='img' src='/assets/not_thumbnail.png' alt='not_thumbnail' />
        </Card>
      )}
    </div>
  );
}

const CustomPrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    style={{
      color: colors.divider1,
      position: 'absolute',
      top: '50%',
      left: 0,
      zIndex: 1,
      cursor: 'pointer',
    }}
  >
    <Iconify icon="iconamoon:arrow-left-6-circle-fill" />
  </IconButton>
);

CustomPrevArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const CustomNextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    style={{
      color: colors.divider1,
      position: 'absolute',
      top: '50%',
      right: 0,
      zIndex: 1,
      cursor: 'pointer',
    }}
  >
    <Iconify icon="iconamoon:arrow-right-6-circle-fill" />
  </IconButton>
);

CustomNextArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

AppCardImage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ).isRequired,
};
