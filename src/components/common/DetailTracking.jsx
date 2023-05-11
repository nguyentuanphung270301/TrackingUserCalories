import { Avatar, Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import accountsApi from '../../api/modules/accounts.api'
import foodTrackingApi from '../../api/modules/foodtracking.api'
import ProgressBar from "@ramonak/react-progress-bar";

const DetailTracking = () => {
    const username = useSelector((state) => state.user.username) || localStorage.getItem('username')
    const [userId, setUserId] = useState(null)
    const [fat, setFat] = useState(0)
    const [protein, setProtein] = useState(0)
    const [carb, setCarb] = useState(0)
    const [progressProtein, setProgressProtein] = useState(null)

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
        const getUser = async () => {
            try {
                const response = await accountsApi.getAccount(username)
                setUserId(response.user.id)
                console.log(response)
                if(response.user.weight !== null){
                    setProgressProtein(response.user.weight*1.3)
                }
                else{
                    setProgressProtein(100)
                }
            } catch (error) {
                console.log('Failed to fetch account: ', error)
                setProgressProtein(100)
            }
        }
        getUser()
    }, [username])

    useEffect(() => {
        const getTrackingList = async () => {
            const { response, err } = await foodTrackingApi.reportCalories(dateTime, reportType, userId)
            if (response) {
                console.log(response)
                setFat(response.consumedHistory.reduce((total, item) => total + item.food.fat * item.consumedGram / 100, 0))
                setProtein(response.consumedHistory.reduce((total, item) => total + item.food.protein * item.consumedGram / 100, 0))
                setCarb(response.consumedHistory.reduce((total, item) => total + item.food.carb * item.consumedGram / 100, 0))
            }
            if (err) {
                console.log(err)
            }
        }
        getTrackingList()
    }, [userId, username])

    return (
        <Box
            sx={{
                position: 'relative',
                height: '50%',
                width: 'calc(50vw - 60px)',
                backgroundColor: '#191919',
                borderRadius: '5px'
            }}
        >
            <Typography variant='h5' fontWeight='500' fontSize='20px' textAlign='left' sx={{
                position: 'absolute',
                top: '20px',
                left: '10px',
                color: '#eaeaea'
            }}>Detail Tracking Today</Typography>
            <Box
                sx={{
                    position: 'absolute',
                    height: '80%',
                    width: '100%',
                    bottom: '0',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '210px',
                        height: '270px',
                        marginLeft: '10px',
                        backgroundColor: '#ffc607',
                        borderRadius: '5px'
                    }}
                >
                    <Avatar src={require('../../images/icons8-fat-64.png')} alt='ảnh'
                        sx={{
                            position: 'absolute',
                            top: '40px',
                            left: '30px',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                        }}
                    />

                    <Typography variant='h6' fontWeight='500' fontSize='16px' sx={{
                        position: 'absolute',
                        top: '100px',
                        left: '30px'
                    }} >Total Fat</Typography>
                    <Typography variant='h6' fontWeight='500' fontSize='16px' sx={{
                        position: 'absolute',
                        top: '150px',
                        left: '30px',
                        width: '150px',
                        backgroundColor: '#ffdf00',
                        borderRadius: '5px'
                    }}>{fat.toFixed(2)}G</Typography>
                    <ProgressBar margin='220px 0px 0px 30px' width='150px' completed={`${((fat/80)*100).toFixed(2)}%`} maxCompleted={100} bgColor='#0099ff' />
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                        width: '210px',
                        height: '270px',
                        backgroundColor: '#0e5400',
                        borderRadius: '5px'
                    }}
                >
                    <Avatar src={require('../../images/icons8-protein-50.png')} alt='ảnh'
                        sx={{
                            position: 'absolute',
                            top: '40px',
                            color: 'white',
                            left: '30px',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                        }}
                    />
                    <Typography variant='h6' fontWeight='500' fontSize='16px' sx={{
                        position: 'absolute',
                        top: '100px',
                        left: '30px',
                        color: 'white'
                    }} >Total Protein</Typography>
                    <Typography variant='h6' fontWeight='500' fontSize='16px' sx={{
                        position: 'absolute',
                        top: '150px',
                        left: '30px',
                        width: '150px',
                        color: 'white',
                        backgroundColor: '#147800',
                        borderRadius: '5px'
                    }} >{protein.toFixed(2)}G</Typography>
                    <ProgressBar margin='220px 0px 0px 30px' width='150px' completed={`${((protein/progressProtein)*100).toFixed(2)}%`} maxCompleted={100} bgColor='#0099ff' />
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                        width: '210px',
                        height: '270px',
                        marginRight: '10px',
                        backgroundColor: '#ff2525db',
                        borderRadius: '5px'
                    }}
                >
                    <Avatar src={require('../../images/icons8-carbohydrates-50.png')} alt='ảnh'
                        sx={{
                            position: 'absolute',
                            top: '40px',
                            left: '30px',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                        }}
                    />
                    <Typography variant='h6' fontWeight='500' fontSize='16px' sx={{
                        position: 'absolute',
                        top: '100px',
                        left: '30px',
                        color: 'white'
                    }} >Total Carb</Typography>
                    <Typography variant='h6' fontWeight='500' fontSize='16px' sx={{
                        position: 'absolute',
                        top: '150px',
                        left: '30px',
                        width: '150px',
                        color: 'white',
                        backgroundColor: '#ff0000',
                        borderRadius: '5px'
                    }} >{carb.toFixed(2)}G</Typography>
                    <ProgressBar margin='220px 0px 0px 30px' width='150px' completed={`${((carb/125)*100).toFixed(2)}%`} bgColor='#0099ff'  maxCompleted={100}/>
                </Box>
            </Box>
        </Box>
    )
}

export default DetailTracking