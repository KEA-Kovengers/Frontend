import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box, Card, CardMedia, IconButton } from '@mui/material'

import { styled } from '@mui/material/styles';
import { colors } from 'src/theme/variableColors';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const card_style = {
    borderRadius: 0,
    bgcolor: 'background.default',
    width: '100%',
    position: 'relative',
    paddingBottom: '56.25%', //16:9 비율
}

const CustomCardMedia = styled(CardMedia)({
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0, // 이거를 안하면 이미지가 겹쳐서 보임
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
            {Array.isArray(images) && images.length > 1 ? (
                <Slider {...settings} ref={sliderRef}>
                    {images.map((image) => (
                        <Card key={image.id} sx={card_style}>
                            <CustomCardMedia
                                component="img"
                                src={image.src}
                                alt={image.id} />
                        </Card>
                    ))}
                </Slider>
            ) : (
                images.map((image, idx) => (
                    <Card key={idx} sx={card_style}>
                        <CustomCardMedia component="img" src={image.src} alt={image.id} />
                    </Card>
                ))
            )}
        </div>
    );
}

// 슬라이더 화살표 커스텀
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
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
}