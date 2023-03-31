import { Box, Grid, IconButton, Stack, Typography } from '@mui/material'
import { width } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { routesGen } from "../../routes/routes";
import favoriteFoodApi from '../../api/modules/favoritesfood.api';
import accountsApi from '../../api/modules/accounts.api';
import FavoriteIcon from '@mui/icons-material/Favorite';


const FoodItems = ({ foods, request }) => {

    const [listFavorites, setListFavorites] = useState([])

    const username = localStorage.getItem('username')

    const [isChecked, setIsChecked] = useState([])

    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const getAccount = async () => {
            try {
                const response = await accountsApi.getAccount(username)
                if (response) {
                    await setUserId(response.user.id)
                }
            } catch (error) {
                console.log('Failed to fetch account: ', error)
            }
        }
        getAccount()
    }, [])

    useEffect(() => {
        if (userId !== null) {
            getListFavorites(userId);
        }
    }, [userId, request]);


    const getListFavorites = async (userId) => {
        const { response, err } = await favoriteFoodApi.getListFavoriteFood({ userId })
        if (response) {
            await setListFavorites(response)
            await setIsChecked(response.map((checked) => checked.food.id))
        }
        if (err) console.log(err)
    }



    return (
        <>
            {foods && foods.map((item, index) => (
                <Grid item key={index} xs={2} sm={4} md={2} width='235px'
                    sx={{
                        margin: '10px 40px 0px 0px',
                        marginTop: '10!important',
                        paddingLeft: '0!important',
                        paddingTop: '0!important',
                    }}>
                    <Link to={routesGen.foodDetail(item.id)}>
                        <Box
                            sx={{
                                bgcolor: '#f5f5f5',
                                p: 2, height: '270px',
                                width: '230px!important',
                                position: 'relative',
                                transition: 'opacity 0.3s ease',
                                cursor: 'pointer',
                                borderRadius: '10px',
                                ":hover": {
                                    opacity: '0.8',
                                    transform: 'translateY(-5px)',
                                }
                            }}
                        >
                            <img src={item.image} alt='Ảnh' style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                top: 0,
                                left: 0,
                                padding: 0,
                                borderRadius: '10px',
                                overflow: 'hidden',
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                            }} />
                            {isChecked.includes(item.id)
                                &&
                                (<FavoriteIcon sx={{ position: 'absolute', width: '32px', height: '32px', marginLeft: '65px', color: 'red' }} />)}
                            <Typography
                                variant='h7'
                                color='white'
                                fontSize='18px'
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    marginBottom: '20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontWeight: '500'
                                }}>{item.name}
                            </Typography>
                        </Box>
                    </Link>
                </Grid>
            ))}
        </>
    )
}

export default FoodItems