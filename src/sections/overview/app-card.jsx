import React, { useRef } from "react";
import PropTypes from 'prop-types';

import { faker } from '@faker-js/faker';
import { fDate } from 'src/utils/format-time';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {Box, Stack, Grid, Link, Card, CardContent, CardMedia, Typography, IconButton} from '@mui/material'

import { colors } from 'src/theme/variableColors';

import Iconify from 'src/components/iconify'; 

// ----------------------------------------------------------------------

const card_style = {
  borderRadius: 0,
  bgcolor: 'background.default',

}

const images = [
  {
    id:0,
    src:'/assets/images/santamonica.jpg',
  },
];

const Userimage = (
  <img 
  src='/assets/images/userimage.png'
  alt="user" 
  style={{
      borderRadius: '50%', 
      marginLeft: '5px',
      width:'100%',
      height:'100%',
      maxWidth: '50px',
      maxHeight:'50px'
  }}/>
);

const Title = (
  <Link 
      sx={{
          color:colors.blueBlack,
          fontSize:'20px',
          maxWidth: '75%',
          textOverflow: 'ellipsis'}}
      underline="hover" 
      noWrap>
  오늘은 다같이 피자 먹은 날 오늘은 다같이 피자 먹은 날 오늘은 다같이 피자 먹은 날
  </Link>
);

const UserName = (
  <Typography
  label='UserName'
  sx={{ 
      color:colors.blueBlack,
      fontSize:'13px',
      maxWidth: '150px',
      textOverflow: 'ellipsis' ,
      paddingRight: '10px'}}                  
  noWrap>
  남솜2 남솜2 남솜2 남솜2 남솜2 남솜2 남솜2 
</Typography>
);

const Date = (
  <Typography
      label='date'
      variant="caption"
      sx={{
          color: colors.textGrey,
          fontSize:'13px'
      }}
      noWrap>
    {fDate(faker.date.past())}
  </Typography>
);

const CommunityInformation = (
  <Stack flexDirection="row">
    <Stack direction="row">
      <IconButton>
      <Iconify icon= 'icon-park-outline:like' sx={{ display:'flex',mr: 0.5 }} color={colors.blueBlack}/>
      </IconButton>
      <Typography sx={{display:'flex',justifyContent:'center',alignItems:'center',verticalAlign:'center'}}>12</Typography>
    </Stack>

    <Stack direction="row">
    <IconButton>
      <Iconify icon= 'iconoir:chat-bubble' sx={{ display:'flex', ml: 1, mr: 0.5 }} color={colors.blueBlack}  />
      </IconButton>
      <Typography sx={{display:'flex',justifyContent:'center',alignItems:'center',verticalAlign:'center'}}>31</Typography>
    </Stack>
  </Stack>
);

export default function AppCard3(){
  
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
      <div className="slider-container">

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
        

        <Card sx={{...card_style,marginBottom:'70px'}} >
          <Grid container>
            <Grid item xs={1} sx={{ display:'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CardMedia>
                {Userimage}
              </CardMedia>
            </Grid>

          <Grid item xs={11} >
              <CardContent sx={{display:'flex', flexDirection: 'column', paddingTop: 3}}>
                <Box sx={{ display: 'flex', flexDirection: 'row',}}>
                  {Title}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex' }}>
                    {UserName}
                    {Date}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row-reverse' }}>
                    {CommunityInformation}     
                  </Box>
                </Box>
              </CardContent>
          </Grid>
          </Grid>
        </Card>
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