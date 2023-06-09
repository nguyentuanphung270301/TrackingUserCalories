import { Box, Button, Chip, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import foodApi from '../api/modules/foods.api'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import favoriteFoodApi from '../api/modules/favoritesfood.api';
import accountsApi from '../api/modules/accounts.api';
import { toast } from 'react-toastify';
import FoodItems from '../components/common/FoodItems';

const FoodDetail = () => {

  const id = useParams()

  const [request, setRequest] = useState(false)

  const foodId = Number(id.id)

  const [isFoodFavorited, setIsFoodFavorited] = useState(false);

  const [food, setFood] = useState(null)

  const [isLoading, setIsLoading] = useState(true)

  const [listFoods, setListFoods] = useState(null)

  const [listFavorites, setListFavorites] = useState([])


  const username = localStorage.getItem('username')


  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const getAccount = async () => {
      try {
        const response = await accountsApi.getAccount(username)
        if (response) {
          await setUserId(response.user.id)
          console.log(typeof userId)
        }
      } catch (error) {
        console.log('Failed to fetch account: ', error)
      }
    }
    getAccount()
  }, [id])

  useEffect(() => {
    if (userId !== null) {
      getListFavorites(userId);
    }
  }, [userId]);

  const getListFavorites = async (userId) => {
    const { response, err } = await favoriteFoodApi.getListFavoriteFood({ userId })
    if (response) {
      console.log(response)
      await setListFavorites(response)
    }
    if (err) console.log(err)
  }


  useEffect(() => {
    if (listFavorites && listFavorites.some(favorite => favorite.food.id === foodId)) {
      setIsFoodFavorited(true);
    } else {
      setIsFoodFavorited(false);
    }
  }, [listFavorites, foodId]);



  useEffect(() => {
    const getFood = async () => {
      const { response, err } = await foodApi.getFood(foodId)
      if (response) {
        console.log(response)
        setFood(response)
        setIsLoading(false)
      }
      if (err) console.log(err)
    }
    getFood()
  }, [id])



  const addFavorite = async () => {
    const { response, err } = await favoriteFoodApi.addFavoriteFood(userId, foodId)
    if (response) {
      setIsFoodFavorited(!isFoodFavorited);
      setRequest(!request)
      console.log(response)
      toast.success('Add food favorite successfully')
    }
    if (err) console.log(err)
  }


  const removeFavorite = async () => {
    const { response, err } = await favoriteFoodApi.deleteFavoriteFood({ userId, foodId })
    if (response) {
      setIsFoodFavorited(!isFoodFavorited)
      setRequest(!request)
      console.log(response)
      toast.success('Remove food favorite successfully')
    }
    if (err) console.log(err)
  }


  const getFoodWithCategory = async (cateId) => {
    const { response, err } = await foodApi.listFoodsWithCategory(cateId)
    if (response) {
      console.log(response)
      setListFoods(response)
    }
    if (err) console.log(err)
  }

  useEffect(() => {
    if (food !== null) {
      getFoodWithCategory(food.category.id)
    }
  }, [food, request]);

  return (
    <>
      {isLoading && <CircularProgress sx={{
        color: 'green',
        margin: 'calc(500px / 2)',
        width: '100px',
        height: '100px'
      }} />}
      {!isLoading && (
        <>
          <Stack sx={{
            backgroundColor: '#fbfbfb',
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            backgroundImage: food && `linear-gradient(to top, rgba(245,245,245,1), rgba(0,0,0,0)),linear-gradient(to right, rgba(245,245,245,1), rgba(0,0,0,0)), url(${food?.category.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
            <img src={food && food.image} alt='Ảnh' style={{
              width: '425px', height: '625px', borderRadius: '20px', margin: '40px 40px', boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)', objectFit: 'cover'
            }} />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant='h3' fontWeight='500' color='black' textAlign='left' sx={{ margin: '40px 40px' }}>{food && `${food.name}`}</Typography>
              <Chip
                label={food && food.category.name}
                variant='filled'
                style={{
                  float: 'left',
                  width: '100px',
                  marginLeft: '40px',
                  marginBottom: '40px',
                  color: 'white',
                  fontSize: '18px',
                  fontFamily: 'Roboto',
                  backgroundColor: '#2daf1b'
                }}
              />
              <Box sx={{
                float: 'left',
                display: 'flex',
                marginLeft: '40px',
              }}>
                <Chip
                  label={food && `Carb: ${food.carb}`}
                  variant='filled'
                  style={{
                    color: 'white',
                    fontSize: '16px',
                    width: '100px',
                    fontFamily: 'Roboto',
                    backgroundColor: '#2daf1b',
                    marginRight: '40px'
                  }}
                />
                <Chip
                  label={food && `Protein: ${food.protein}`}
                  variant='filled'
                  style={{
                    color: 'white',
                    fontSize: '16px',
                    width: '150px',
                    fontFamily: 'Roboto',
                    backgroundColor: '#2daf1b',
                    marginRight: '40px'
                  }} />
                <Chip
                  label={food && `Fat: ${food.fat}`}
                  variant='filled'
                  style={{
                    color: 'white',
                    fontSize: '16px',
                    width: '100px',
                    fontFamily: 'Roboto',
                    backgroundColor: '#2daf1b',
                    marginRight: '40px'
                  }}
                />
              </Box>
              <Typography variant='p' textAlign='left' color='black' sx={{ margin: '40px' }}>{food && food.description}</Typography>
              <Button sx={{
                width: '200px',
                height: '50px',
                marginLeft: '40px',
                backgroundColor: isFoodFavorited ? 'red' : '#2daf1b',
                ":hover": {
                  backgroundColor: '#ccc'
                }
              }}
                onClick={() => {
                  if (isFoodFavorited) removeFavorite()
                  else addFavorite()
                }}
              >{isFoodFavorited ? (<DeleteOutlineOutlinedIcon sx={{ marginRight: '10px', color: 'white' }} />) : (<FavoriteBorderOutlinedIcon sx={{ marginRight: '10px', color: 'white' }} />)}

                {isFoodFavorited ? (<Typography fontWeight='500' color='white'>Remove</Typography>) : (<Typography fontWeight='500' color='white'>Add Favorite</Typography>)}
              </Button>
            </Box>
          </Stack>
          <Stack sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <Typography color='black' position='relative' variant='h4' fontWeight='500' sx={{ float: 'left', marginLeft: '40px', marginBottom: '10px', marginTop: '20px' }}>Other Food Of Same Category</Typography>
            <Box sx={{
              flexGrow: 1,
              margin: '40px 0px 20px 0px',
              width: '1450px',
            }}>
              <Grid container spacing={2} display='block'>
                <Grid item xs display='flex' overflow='auto' marginLeft='50px'
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
                  <FoodItems foods={listFoods} request={isFoodFavorited} />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </>
      )}
    </>
  )
}

export default FoodDetail