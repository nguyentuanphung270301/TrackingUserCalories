import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import accountsApi from '../../api/modules/accounts.api'
import foodApi from '../../api/modules/foods.api'
import foodTrackingApi from '../../api/modules/foodtracking.api'
import TrackingItem from './TrackingItem'

const TrackingRight = () => {

  const foodId = useSelector((state) => state.user.foodId)
  const [foodItem, setFoodItem] = useState(null)
  const [consumedGram, setConsumedGram] = useState(null)
  const [userId, setUserId] = useState(null)
  const username = localStorage.getItem('username')
  const [isRequest, setIsRequest] = useState(false)
  const [trackingList, setTrackingList] = useState(null)

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const todayStr = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

  console.log(isRequest)

  useEffect(() => {
    const getTrackingList = async () => {
      const { response, err } = await foodTrackingApi.getFoodTracking(userId)
      if (response) {
        console.log(response)
       setTrackingList(response.filter(item => item.consumedDatetime.split(' ')[0] === todayStr))
      }
      if (err) console.log(err)
    }
    getTrackingList()
  }, [isRequest])

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await accountsApi.getAccount(username)
        setUserId(response.user.id)
        setIsRequest(!isRequest)
      } catch (error) {
        console.log('Failed to fetch account: ', error)
      }
    }
    getUser()
  }, [username])

  useEffect(() => {
    const getFood = async () => {
      if (foodId !== null) {
        const { response, err } = await foodApi.getFood(foodId)
        if (response) {
          setFoodItem(response)
          console.log(response)
        }
        if (err) {
          console.log(err)
        }
      }
    }
    getFood()
  }, [foodId])


  const onSave = async () => {
    const { response, err } = await foodTrackingApi.addFoodTracking({ userId, foodId, consumedGram })
    setIsRequest(!isRequest)
    if (response) {
      console.log(response)
      toast.success("Add tracking successfully")
    }
    if (err) toast.error(err)
  }

  return (
    <>
      <Box border='2px solid black'
        borderRadius='5px'
        height='270px'
        marginRight='5px'
      >
        {foodItem && userId ?
          <Box display='flex' alignItems='center'>
            <Box>
              <Typography variant='h6' fontWeight='500' sx={{
                margin: '20px 20px',
                textAlign: 'initial'
              }} >{`Food: ${foodItem.name}`}</Typography>
              <Typography variant='h6' fontWeight='500' fontSize='17px' sx={{
                margin: '0px 20px 10px 20px',
                textAlign: 'initial'
              }} >{`Carb: ${foodItem.carb}g`}</Typography>
              <Typography variant='h6' fontWeight='500' fontSize='17px' sx={{
                margin: '0px 20px 10px 20px',
                textAlign: 'initial'
              }} >{`Fat: ${foodItem.fat}g`}</Typography>
              <Typography variant='h6' fontWeight='500' fontSize='17px' sx={{
                margin: '0px 20px 10px 20px',
                textAlign: 'initial'
              }} >{`Protein: ${foodItem.protein}g`}</Typography>
              <Typography variant='h6' fontWeight='500' fontSize='17px' sx={{
                margin: '0px 20px 10px 20px',
                textAlign: 'initial'
              }} >{foodItem && `Energy Per Serving: ${foodItem.energyPerServing}g`}</Typography>
            </Box>
            <img alt='Ảnh' src={foodItem.image} style={{
              width: '200px',
              height: '250px',
              margin: '10px',
              borderRadius: '10px'
            }} />
          </Box> : <img alt='Ảnh' src={require('../../images/4426510.jpg')} style={{
            height: '100%',
            width: '100%'
          }} />}
      </Box>
      <Box sx={{
        margin: '10px 5px 10px 0px'
      }}>
        <TextField
          type='number'
          color='success'
          label="Consumed gram"
          value={consumedGram || ''}
          onChange={(e) => {
            setConsumedGram(e.target.value)
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">gram</InputAdornment>,
          }}
          sx={{
            width: '100%',
            marginBottom: '10px'
          }}
          error={consumedGram === null}
          helperText={consumedGram === null && 'Consumed gram cannot be empty'}
        />
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#2daf1b',
            width: '100%',
            ":hover": {
              backgroundColor: '#2daf1b',
              opacity: '0.8'
            }
          }}
          onClick={onSave}
        >
          Save
        </Button>
      </Box>
      <Typography variant='h6' textTransform='uppercase' sx={{

      }}>Added Today Menu</Typography>
      <Box
        border='2px solid black'
        borderRadius='5px'
        height='310px'
        margin='0px 5px 5px 0px'
        position='relative'
      >
        <Grid container spacing={2} margin='0' height='100%' width='100%' overflow='auto' sx={{
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
        }}>
          <Grid item xs
            sx={{
              padding: '0!important',
              margin: '5px'
            }}
          >
            {trackingList && <TrackingItem trackingList={trackingList} />}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default TrackingRight