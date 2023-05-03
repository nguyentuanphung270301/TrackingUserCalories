import React, { useEffect, useState } from 'react';
import foodApi from '../../api/modules/foods.api';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box, Stack } from '@mui/system';
import { Autoplay } from 'swiper';
import { Chip, Typography } from '@mui/material';

import 'swiper/css';


const FoodSlide = () => {

    const [foods, setFoods] = useState(null)

    useEffect(() => {
        const getFood = async () => {
            const { response, err } = await foodApi.listFoods()
            if (response) {
                setFoods(response)
                console.log(response)
            }
            if (err) console.log(err)
        }
        getFood()
    }, [])


    return (
        <Box sx={{
            position: 'relative',
            "&::before": {
                content: '""',
                width: '100vw',
                height: '500px',
                position: 'relative',
                bottom: 0,
                left: 0,
                pointerEvents: 'none',
            }
        }} >
            <Swiper
                grabCursor={true}
                loop={true}
                direction='horizontal'
                modules={[Autoplay]}
                style={{ width: "100%", height: "500px" }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
            >
                {foods && foods.map((item, index) => (
                    <SwiperSlide key={index} style={{ width: "100%", height: "500px" }} >
                        <Box sx={{
                            position:'fixed',
                            backgroundPosition: 'top',
                            backgroundSize: 'cover',
                            width:'100%',
                            height: '500px',
                            backgroundImage: `linear-gradient(to right, rgba(245,245,245,1), rgba(0,0,0,0) 600px),linear-gradient(to top, rgba(245,245,245,1), rgba(0,0,0,0) 300px) ,url(${item.image})`,
                        }}>
                        <Box>
                            <Typography variant='h3' color='black' fontWeight='600'
                                sx={{
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    margin: '100px 100px 50px 100px',
                                }}
                            >{item.name}</Typography>
                            <Box display='flex'
                                marginBottom='40px'>
                                <Chip
                                    label={`Carb: ${item.carb}`}
                                    variant='filled'
                                    style={{
                                        color: 'white',
                                        float: 'left',
                                        fontSize: '16px',
                                        width: '100px',
                                        fontFamily: 'Roboto',
                                        backgroundColor: '#2daf1b',
                                        marginLeft: '100px'
                                    }} />
                                <Chip
                                    label={`Protein: ${item.protein}`}
                                    variant='filled'
                                    style={{
                                        color: 'white',
                                        float: 'left',
                                        fontSize: '16px',
                                        width: '150px',
                                        fontFamily: 'Roboto',
                                        backgroundColor: '#2daf1b',
                                        marginLeft: '30px'
                                    }} />
                                <Chip
                                    label={`Fat: ${item.fat}`}
                                    variant='filled'
                                    style={{
                                        color: 'white',
                                        float: 'left',
                                        fontSize: '16px',
                                        width: '100px',
                                        fontFamily: 'Roboto',
                                        backgroundColor: '#2daf1b',
                                        marginLeft: '30px'
                                    }} />
                            </Box>
                            <Typography variant='p' color='black' display='flex' fontSize='20px' sx={{ margin: '100px 100px' }}>{item.description}</Typography>
                        </Box>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}

export default FoodSlide