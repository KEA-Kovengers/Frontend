import React,{ useState } from 'react';
import { Link } from 'react-router-dom';

import { faker } from '@faker-js/faker';
import { fDate } from 'src/utils/format-time';

import { 
    Card, CardContent, CardMedia, 
    Stack, Grid, Box, 
    Typography, IconButton} from '@mui/material'

import { colors } from 'src/theme/variableColors';

import Iconify from 'src/components/iconify'; 

// ----------------------------------------------------------------------

export default function AppCardInfo(){

    const card_style = {
        borderRadius: 0,
        bgcolor: 'background.default',
      }
      
    const Userimage = (
        <img 
        src='assets\images\avatars\somi.jpg'
        alt="user" 
        style={{
            borderRadius: '50%', 
            width:'100%',
            height:'100%',
            maxWidth: '50px',
            maxHeight:'50px',
        }}/>
      );
      
      const Title = (
        <Typography 
          component={Link}
          to='/article'
          sx={{
            color:colors.blueBlack,
            fontSize:'20px',
            maxWidth: '75%',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
            }}
        >
        고양이 감기
        </Typography>
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
        Nam Somi
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
          {/*{fDate(faker.date.past())} */}
          2024. 03. 15
        </Typography>
      );

      const [like, setLike] = useState(false);
      const [likeCount, setLikeCount] = useState(12);

      const handleLike = () => {
        setLike(!like);
    }
      const handleLikeCount = () => {
        setLikeCount(likeCount + 1);
    }

      const CommunityInformation = (
        <Stack flexDirection="row">
          <Stack direction="row">
            <IconButton onClick={handleLike} color={like ? '#FF5631' : '#637381'}>
            <Iconify icon= {like ? "flat-color-icons:like" : "icon-park-outline:like"} sx={{ display:'flex',mr: 0.5 }} color={colors.blueBlack}/>
            </IconButton>
            <Typography sx={{display:'flex',justifyContent:'center',alignItems:'center',verticalAlign:'center'}}>7</Typography>
          </Stack>
      
          <Stack direction="row">
          <IconButton>
            <Iconify icon= 'iconoir:chat-bubble' sx={{ display:'flex', ml: 1, mr: 0.5 }} color={colors.blueBlack}  />
            </IconButton>
            <Typography sx={{display:'flex',justifyContent:'center',alignItems:'center',verticalAlign:'center'}}>3</Typography>
          </Stack>
        </Stack>
      );
      
    return (
        <Card sx={{...card_style,marginBottom:'70px',paddingLeft:'10px'}} >
            <Grid container alignItems='center'>
                <Grid item xs={1}>
                    <Box sx={{ display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {Userimage}
                    </Box>
                </Grid>

                <Grid item xs={11} >
                    <CardContent sx={{display:'flex', flexDirection: 'column'}}>
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
    );
};