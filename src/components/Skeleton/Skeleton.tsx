import React from 'react'

import { useTheme } from '@mui/material/styles';
import { Stack, Skeleton } from '@mui/material';


const SkeletonComponent : () => JSX.Element = () => {
  const theme = useTheme();
  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      sx={{ flexWrap: 'wrap' }}
    >
      <Skeleton variant="rectangular" width={260} height={220} />
      <Skeleton variant="rectangular" width={290} height={230} />
      <Skeleton variant="rectangular" width={230} height={210} />
      <Skeleton variant="rectangular" width={260} height={220} />
      <Skeleton variant="rectangular" width={290} height={230} />
      <Skeleton variant="rectangular" width={230} height={210} />
    </Stack>
  )
}

export default SkeletonComponent
