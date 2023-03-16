import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import FoodItems from './FoodItems'

const FoodGrids = ({ categories }) => {
    return (
        <Box position='absolute' sx={{
            backgroundColor:'white'
        }}>
            {categories && categories.map((item, index) => (
                <Stack
                    width='1400px'
                    height='300px'
                    display='inline-block'
                    sx={{
                        marginBottom: '20px',
                        marginTop: '20px',
                        marginLeft: '10px',

                    }}
                    key={index}>
                    <Grid container spacing={2} margin='0!important' >    
                        <Typography sx={{ marginLeft: '20px' }} fontWeight='600' textTransform='uppercase' color='black' variant='h6'>{item.name}</Typography>
                        <Grid item xs={10}>
                        </Grid>
                        <FoodItems foods={item.foods} />
                    </Grid>
                </Stack>
            ))}
        </Box>
    )
}

export default FoodGrids 