import React, { useEffect, useRef } from 'react';

import { faker } from '@faker-js/faker';

import {Box, Link, Card, Stack, Typography, Grid} from '@mui/material';
import Avatar from '@mui/material/Avatar';

import { fDate } from 'src/utils/format-time';

import { colors } from 'src/theme/variableColors';
import { account } from 'src/_mock/account';

// ----------------------------------------------------------------------

const card_style = {
    position: 'relative',
    border: '1px solid black', 
    borderRadius: 0,
    bgcolor: 'background.default',
}

const image = (
    <img
      src='/assets/images/pizza.png'
      alt='pizza'
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
      }}
    />
  ); 

const Title = (
    <Link 
        sx={{
            color:colors.blueBlack,
            fontSize:'25px',
            maxWidth: '60%',
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap', 
        }}
        underline="hover">
    오늘은 다같이 피자 먹은 날 
    </Link>
);

const UserName = (
    <Typography
    label='UserName'
    sx={{ 
        color:colors.blueBlack,
        fontSize:'15px',
        maxWidth: '300px',
        overflow: 'hidden',
        textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap', 
    }}   
    >
    남솜2
</Typography>
);

const Date = (
    <Typography
        label='date'
        variant="caption"
        component="div"
        sx={{
            color: colors.textGrey,
            fontSize:'15px'
        }}>
      {fDate(faker.date.past())}
    </Typography>
  );

const Userimage = (
    <img 
    src='/assets/images/userimage.png'
    alt="user" 
    style={{
        borderRadius: '50%', 
        padding:'18px',
        weight:'100px',
        height:'100px',
    }}/>
);

export default function AppCard(){

    return(
        <Card sx={card_style}>
            <Box  sx={{ pt: '50%', position: 'relative' }}>
                {image}
            </Box>

            <Grid container alignItems="center">
                <Grid item>
                    {Userimage}
                </Grid>
            
                <Grid item xs={12} sm container direction="column" sx={{pt: 2}}>
                        <Grid item xs>
                            {Title}
                        </Grid>
                        <Grid item container direction="row" alignItems="center" sx={{paddingTop:'px'}}>
                            <Grid item>
                                {UserName}
                            </Grid>
                            <Grid item>
                                {Date}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        </Card>
    );

}
