import React from 'react'

import { useTheme } from '@mui/material/styles';
import { Stack, Skeleton, Box } from '@mui/material';
import Card from '../Card/Card';
import _ from 'lodash';  // In ES6


const SkeletonComponent : () => JSX.Element = () => {
  const theme = useTheme();

  const SkeletonElem = ()=>{
    return <Card
      sx={{
        width: {xs:'90%', md:'21em'},
        margin:'0 1.5em 0 0',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        //marginRight:'1.5em',
        '@media (min-width:600px)': {
          width: '75%',
        },
        background:theme.palette.grey[50]
      }}
    >

      <Skeleton variant="rectangular" width='45%' height={'1.2em'} />
      <Skeleton variant="rectangular" width='100%' height={'1em'} />
      <Skeleton variant="rectangular" width='100%' height={'1em'} />
    </Card>
  }

  const getSkeletonList = (length : number = 0)=>{

    if (length === 0){
      length = _.random(2, 6)
    }

    let list = [];

    for(let i=0; i<length; i++){

      list.push(
        <SkeletonElem key={i}></SkeletonElem>
      );
    }

    return list;
  }
  return (
    <Stack
            //spacing={{ xs: 2, sm:'inherit'}}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
            alignItems={{ xs: 'center', sm: 'center' }}
            sx={{ 
              flexWrap: 'wrap', 
              rowGap: { xs: '1.5em' },
            }}
            width={{ xs: '100%'}}
          >
      {
        getSkeletonList()
      }
    </Stack>
  )
}

export default SkeletonComponent
