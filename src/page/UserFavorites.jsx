import { Grid, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import accountsApi from '../api/modules/accounts.api'
import favoriteFoodApi from '../api/modules/favoritesfood.api'
import FoodItems from '../components/common/FoodItems'
import { routesGen } from '../routes/routes'
import { LoadingButton } from '@mui/lab'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { toast } from 'react-toastify'


const UserFavorites = () => {

  const username = useParams()

  const user = localStorage.getItem('username')

  const [request, setRequest] = useState(false)

  const [userId, setUserId] = useState(null)

  const [listFavorites, setListFavorites] = useState(null)

  useEffect(() => {
    const getAccount = async () => {
      try {
        const response = await accountsApi.getAccount(user)
        if (response) {
          await setUserId(response.user.id)
          console.log(typeof userId)
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
  }, [userId,request]);

  const getListFavorites = async (userId) => {
    const { response, err } = await favoriteFoodApi.getListFavoriteFood({ userId })
    if (response) {
      console.log(response)
      await setListFavorites(response)
    }
    if (err) console.log(err)
  }

  const removeFavorite = async (userId, foodId) => {
    const { response, err } = await favoriteFoodApi.deleteFavoriteFood({ userId, foodId })
    if (response) {
      await setRequest(!request)
      console.log(response)
      toast.success('Remove food favorite successfully')
    }
    if (err) console.log(err)
  }

  return (
    <Box position='absolute' width='1476px' height='100%'>
      <Typography variant='h5' textAlign='left' fontWeight='600' sx={{
        margin: '40px',
        color:'black',
      }}>YOUR FAVORITES ({listFavorites && `${listFavorites.length}`})</Typography>

      <Box sx={{
        display: 'flex',
      }}>
        {listFavorites && listFavorites.map((item, index) => (
          <Box sx={{
            marginLeft: '20px'
          }} key={index} >

            <Grid item xs={10}>
            </Grid>
            <Grid item key={index} xs={2} width='50%'
              sx={{
                margin: '10px 10px',
                marginTop: '10!important',
                paddingLeft: '0!important',
                paddingTop: '0!important',
              }}>
              <Link to={routesGen.foodDetail(item.food.id)}>
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
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  <img src={require('../images/FiletMignon.jpeg')} alt='Ảnh' style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    top: 0,
                    left: 0,
                    padding: 0,
                    borderRadius: '10px'
                  }} />

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
                    }}>{item.food.name}
                  </Typography>
                </Box>
              </Link>
            </Grid>

            <LoadingButton
              startIcon={<DeleteOutlineOutlinedIcon />}
              loadingPosition='start'
              variant='contained'
              sx={{
                width:'230px',
                color: 'white',
                backgroundColor: 'red',
                ":hover": {
                  opacity: '0.6',
                  color: 'white',
                  backgroundColor: 'red',
                }
              }}
              onClick={() => removeFavorite(userId, item.food.id)}
            >REMOVE</LoadingButton>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default UserFavorites