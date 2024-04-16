import { faker } from '@faker-js/faker';

import {Box, Link, Card, Stack, Typography} from '@mui/material'

import { fDate } from 'src/utils/format-time';

import { colors } from 'src/theme/variableColors';

// ----------------------------------------------------------------------

const card_style = {
    position: 'relative',
    border: '1px solid black', 
    borderRadius: 0,
    bgcolor: 'background.default',
}

export default function AppCard(){

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
                maxWidth: '80%',
                textOverflow: 'ellipsis'
            }}
            underline="hover" noWrap>
        오늘은 다같이 피자 먹은 날 오늘은 다같이 피자 먹은 날 오늘은 다같이 피자 먹은 날
        </Link>
    );

    const UserName = (
        <Typography
        label='UserName'
        sx={{ 
            color:colors.blueBlack,
            pt: '10px', pl:'100px', pb: '30px',
            fontSize:'15px',
            maxWidth: '300px',
            textOverflow: 'ellipsis' }}                  
        noWrap>
        남솜2 남솜2 남솜2 남솜2 남솜2 남솜2 남솜2 남솜2 남솜2 남솜2 남솜2
    </Typography>
    );
    
    const Date = (
        <Typography
            label='date'
            variant="caption"
            component="div"
            sx={{
                pt: '10px', pl:'10px', pb: '30px',
                color: colors.textGrey,
                fontSize:'15px'
            }}
            noWrap>
          {fDate(faker.date.past())}
        </Typography>
      );

    return(
        <Card sx={card_style}>
            <Box  sx={{ pt: '50%', position: 'relative' }}>
                {image}
            </Box>

            <Stack sx={{ pt: 2, pl:'100px' }}>
                {Title}
            </Stack>

            <Stack direction="row" alignItems="center" >
                {UserName}
                {Date}
            </Stack>
        </Card>
    );

}