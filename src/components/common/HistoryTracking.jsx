import { Box, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import accountsApi from '../../api/modules/accounts.api'
import foodTrackingApi from '../../api/modules/foodtracking.api'

const HistoryTracking = () => {
    const username = useSelector((state) => state.user.username) || localStorage.getItem('username')

    const [isLoading, setIsLoading] = useState(true)

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateTime = `${year}-${month}-${day}`
    const [date, setDate] = useState(dateTime)
    const [userId, setUserId] = useState(null)
    const [trackingHistory, setTrackingHistory] = useState(null)
    const reportType = 'day'



    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await accountsApi.getAccount(username)
                setUserId(response.user.id)
            } catch (error) {
                console.log('Failed to fetch account: ', error)
            }
        }
        getUser()
    }, [username])


    useEffect(() => {
        const getTrackingList = async () => {
            setIsLoading(true)
            const { response, err } = await foodTrackingApi.reportCalories(`${date} 00:00:00`, reportType, userId)
            if (response) {
                console.log(response)
                setTrackingHistory(response.consumedHistory)
               setIsLoading(false)
            }
            if (err) {
                console.log(err)
                setTrackingHistory(null)
                setIsLoading(false)
            }
        }
        getTrackingList()
    }, [userId, username, date])

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                height: '50%'
            }}>
            <Box display='flex' justifyContent='space-between' alignItems='baseline'>
                <Typography variant='h5' fontWeight='500' fontSize='20px' textAlign='left' sx={{
                    margin: '20px',
                    width: '50%'
                }}>Tracking History</Typography>
                <TextField
                    color='success'
                    type='date'
                    value={date || ''}
                    onChange={(e) => {
                        setDate(e.target.value)
                    }}
                    sx={{
                        margin: '20px 0px 0px 0px',
                        width: '200px'
                    }}
                />
            </Box>
            <Box sx={{
                height: '300px',
                margin: '0px 0px 5px 5px',
                border: '1px solid #ccc'
            }}>
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
                            marginTop: '100px',
                            width: '100px',
                            height: '100px'
                        }} />}
                        {!isLoading && (
                            <>
                                {trackingHistory && trackingHistory.map((item, index) => (
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
                                        <Box width='400px' height='100%'>
                                            <Typography fontWeight='600' marginBottom='10px'>{item.food.name}</Typography>
                                            <Typography marginBottom='10px'>Consumed: {item.consumedGram}g</Typography>
                                            <Typography>{item.consumedDatetime}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                                {!trackingHistory && <Typography variant='body' fontSize='18px' marginTop='100px'
                                >No data available today</Typography>}
                            </>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default HistoryTracking