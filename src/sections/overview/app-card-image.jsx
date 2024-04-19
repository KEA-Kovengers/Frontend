import React, { useRef } from "react";
import PropTypes from 'prop-types';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {Card, CardMedia,IconButton} from '@mui/material'

import { colors } from 'src/theme/variableColors';

import Iconify from 'src/components/iconify'; 

// ----------------------------------------------------------------------

const card_style = {
    borderRadius: 0,
    bgcolor: 'background.default',
  }

export default function AppCardImage({images}){

    const sliderRef = useRef(null);
    const settings = {
      arrows:true,
      dots: true,
      dotsClass : "slick-dots", 
      speed: 100,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <CustomPrevArrow onClick={()=>sliderRef.current.slickPrev()}/>,
      nextArrow: <CustomNextArrow onClick={()=>sliderRef.current.slicNext()}/>,
    };

    return (

    <div>

    {/* 이미지의 개수에 따라 slider show 여부 정해짐 */}
    {images.length > 1 ? (
        <Slider {...settings} ref={sliderRef}>
        {images.map((image) => (
        <Card key={image.id} sx={card_style}>
            <CardMedia
            component="img"
            src={image.src} 
            alt={image.id} 
            sx={{
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: '100%',
            }} />
        </Card>
        ))}
        </Slider>
        ) : (
        images.map((image) => (
            <Card key={image.id} sx={card_style}>
            <CardMedia
                component="img"
                src={image.src} 
                alt={image.id} 
                sx={{
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: '100%',
                }} />
            </Card>
            ))
        )}  
    </div>

    );
}

const CustomPrevArrow = ({onClick}) => (
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

const CustomNextArrow = ({onClick}) => (
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

AppCardImage.prototype = {
    images: PropTypes.image,
}