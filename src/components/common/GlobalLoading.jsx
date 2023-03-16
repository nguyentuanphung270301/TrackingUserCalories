import React, { useSelector } from 'react-redux'
import { Paper, Box, LinearProgress, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const GlobalLoading = () => {
    const { globalLoading } = useSelector((state) => state.globalLoading)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (globalLoading) {
            setIsLoading(true)
        } else {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
        }
    }, [globalLoading])

    return (
        <>
            <Paper sx={{
                opacity: isLoading ? 1 : 0,
                pointerEvents: "none",
                transition: "all .3s ease",
                position: "fixed",
                width: "100vw",
                height: "100vh",
                zIndex: 999,
                color: '#2daf1b'
            }} >
                <LinearProgress color='success' />
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    verticalAlign: 'center',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                }}>
                    <img src={require('../../images/calories-calculator.png')} alt='Ảnh' style={{
                        width: '50px',
                        height: '50px', display: 'flex', marginLeft: '9px'
                    }} />
                    <Typography fontFamily='Roboto' fontWeight='700' fontSize='20px' sx={{

                    }}>CALORIES COUNTER APP</Typography>
                </Box>
            </Paper>
        </>
    )
}

export default GlobalLoading
