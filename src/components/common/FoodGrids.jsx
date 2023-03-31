import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import Swiper from 'swiper'
import { SwiperSlide } from 'swiper/react'
import FoodItems from './FoodItems'


const FoodGrids = ({ categories }) => {
    return (
        <Box position='absolute' sx={{
            backgroundColor: 'white'
        }}>
            {categories && categories.map((item, index) => (
                <Box
                    width='1400px'
                    height='350px'
                    display='inline-block'
                    sx={{
                        marginBottom: '20px',
                        marginTop: '20px',
                        marginLeft: '-80px',

                    }}
                    key={index}>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <Grid container spacing={2} display='block'>
                            <Grid item>
                                <Typography fontWeight='600' textTransform='uppercase' textAlign='left' color='black' margin='20px 0px 0px 60px' variant='h6'>{item.name}</Typography>
                            </Grid>
                            <Grid item xs display='flex' overflow='auto' marginLeft='60px'
                                sx={{
                                    '&::-webkit-scrollbar': {
                                        width: '8px',
                                        height: '10px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        background: '#f1f1f1',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: '#ccc',
                                        borderRadius: '10px',
                                    },
                                    '&::-webkit-scrollbar-thumb:hover': {
                                        background: '#555',
                                    },
                                }}
                            >
                                <FoodItems foods={item.foods} />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default FoodGrids 