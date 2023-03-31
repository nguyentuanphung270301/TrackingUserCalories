import { Box, Button, Grid, Typography } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React from 'react'


const TrackingItem = ({ trackingList }) => {
    return (
        <>
            {trackingList && trackingList.map((item, index) => (
                <Grid item key={index} sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100px',
                    border: '2px solid #ccc',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    display: 'flex'
                }} >
                    <Box width='90px' height='100%' position='relative' >
                        <img src={item.food.image} alt='ảnh' style={{
                            position: 'absolute',
                            margin: '4px 0px 0px 4px',
                            width: '90px',
                            height: '90px',
                            objectFit: 'cover',
                            top: 0,
                            left: 0,
                            padding: 0,
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: '1px solid #ccc'
                        }} />
                    </Box>
                    <Box width='200px' height='100%'>
                        <Typography fontWeight='600' marginBottom='10px'>{item.food.name}</Typography>
                        <Typography marginBottom='10px'>Consumed: {item.consumedGram}g</Typography>
                        <Typography>{item.consumedDatetime}</Typography>
                    </Box>
                    <Button
                        variant='contained'
                        startIcon=<DeleteOutlineIcon />
                        sx={{
                            height: '100%',
                            backgroundColor: 'red',
                            ":hover": {
                                backgroundColor: 'red',
                                opacity: 0.8
                            }
                        }}
                    >Remove</Button>
                </Grid>
            ))}
        </>
    )
}

export default TrackingItem
