import { CircularProgress, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import accountsApi from '../api/modules/accounts.api'
import favoriteFoodApi from '../api/modules/favoritesfood.api'
import { routesGen } from '../routes/routes'
import { LoadingButton } from '@mui/lab'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { toast } from 'react-toastify'


const UserFavorites = () => {

  const username = useParams()
  const [loading, setLoading] = useState(true);


  const user = localStorage.getItem('username')

  const [request, setRequest] = useState(false)

  const [userId, setUserId] = useState(null)

  const [listFavorites, setListFavorites] = useState(null)

  useEffect(() => {
    const getAccount = async () => {
      try {
        setLoading(true)
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
  }, [userId, request]);

  const getListFavorites = async (userId) => {
    const { response, err } = await favoriteFoodApi.getListFavoriteFood({ userId })
    if (response) {
      console.log(response)
      await setListFavorites(response)
      setLoading(false)
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
    <Box position='absolute' width='calc(100vw - 60px)' height='100vh' >
      {loading && <CircularProgress sx={{
        color: 'green',
        margin: 'calc(100vh / 2)',
        width: '100px',
        height: '100px'
      }} />}
      {!loading && (
        <>
          <Typography variant='h5' textAlign='left' fontWeight='600' sx={{
            margin: '40px',
            color: 'black',
          }}>YOUR FAVORITES ({listFavorites && `${listFavorites.length}`})</Typography>

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} flexDirection='row' width='1380px'>
            {listFavorites && listFavorites.map((item, index) => (
              <Box sx={{
                marginLeft: '45px'
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
                      <img src={item.food.image} alt='Ảnh' style={{
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
                    width: '230px',
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
          </Grid>
        </>
      )}
    </Box>
  )
}

export default UserFavorites