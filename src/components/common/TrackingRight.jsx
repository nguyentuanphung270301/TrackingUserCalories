import { Box, Button, CircularProgress, Grid, InputAdornment, TextField, Typography } from '@mui/material'
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

  const [isLoading, setIsLoading] = useState(true)

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  const dateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  console.log(dateTime);

  const reportType = 'day';

  useEffect(() => {
    const getTrackingList = async () => {
      const { response, err } = await foodTrackingApi.reportCalories(dateTime, reportType, userId)
      if (response) {
        console.log(response)
        setTrackingList(response.consumedHistory)
        setIsLoading(false)
      }
      if (err) {
        console.log(err)
        setTrackingList(null)
        setIsLoading(false)
      }
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
        toast.error("Please login")
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
    setIsLoading(true)
    const { response, err } = await foodTrackingApi.addFoodTracking({ userId, foodId, consumedGram })
    if (response) {
      setIsRequest(!isRequest)
      console.log(response)
      setConsumedGram(null)
      setFoodItem(null)
      toast.success("Add tracking successfully")
      setIsLoading(false)
    }
    if (err) toast.error(err)
  }


  const deleteTracking = async (trackingId) => {
    setIsLoading(true)
    const { response, err } = await foodTrackingApi.deleteTracking(trackingId)
    if (response) {
      setIsRequest(!isRequest)
      console.log(response)
      toast.success("Remove tracking successfully!")
      setIsLoading(false)
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
            height: '75px',
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
        height='300px'
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
            {isLoading && <CircularProgress sx={{
              color: 'green',
              marginTop: '50px',
              width: '100px',
              height: '100px'
            }} />}
            {!isLoading && (
              <>
                {trackingList && <TrackingItem trackingList={trackingList} deleteTracking={deleteTracking} />}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default TrackingRight