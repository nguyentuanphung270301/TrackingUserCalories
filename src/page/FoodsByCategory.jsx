import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import foodApi from '../api/modules/foods.api'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Box, Grid, ListItemButton, Typography } from '@mui/material';
import FoodItems from '../components/common/FoodItems';



const FoodsByCategory = () => {

    const { name, id } = useParams()

    const foodId = Number(id)

    const [list, setList] = useState(null)


    useEffect(() => {
        const getFoodByCategory = async () => {
            const { response, err } = await foodApi.listFoodsWithCategory(foodId)
            if (response) {
                console.log(response)
                setList(response)
            }
            if (err) console.log(err)
        }
        getFoodByCategory()
    }, [])


    return (
        <>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Typography variant='h2'
                    fontWeight='500'
                    width='500px'
                    textTransform='uppercase'
                >{name}</Typography>
            </Box>
            <Grid container spacing={2} margin='10px 40px' >
            <Grid item xs={10}>
            </Grid>
            <FoodItems foods={list}/>
          </Grid>
        </>
    )
}

export default FoodsByCategory