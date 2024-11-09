import { Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react'


export const useLoading = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    let LoadingElem : JSX.Element = (
        <>
            {isLoading && <Loading/>}
        </>
    );

    return {isLoading, setIsLoading, LoadingElem}
}

const Loading = () => {
    return <>
        <Box
              component="main"
              sx={{
                position: 'absolute',
                top: '0',
                left: '0',
                zIndex: '100',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100dvh',
                gap: 2,
                backgroundColor: 'var(--loading-back-color)'
              }}
      >
        <CircularProgress size="5rem" />
      </Box>
    </>
}

export default useLoading
