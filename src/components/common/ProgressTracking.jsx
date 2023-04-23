import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import accountsApi from '../../api/modules/accounts.api';
import moment from 'moment';
import { useSelector } from 'react-redux';
import foodTrackingApi from '../../api/modules/foodtracking.api';

const ProgressTracking = () => {
    const username = useSelector((state) => state.user.username) || localStorage.getItem('username')

    const [userId, setUserId] = useState(null)
    const [totalCalories, setTotalCalories] = useState(2100)
    const [total, setTotal] = useState(0)
    const [percentage, setPercentage] = useState(0)

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
                if (response.user.gender && response.user.height !== null && response.user.weight !== null && response.user.dob !== null) {
                    const age = moment().diff(response.user.dob, 'years')
                    const temp = (6.25 * response.user.height) + (10 * response.user.weight) - (5 * age) + 5
                    setTotalCalories(temp)
                }
                if (!response.user.gender && response.user.height !== null && response.user.weight !== null && response.user.dob !== null) {
                    const age = moment().diff(response.user.dob, 'years')
                    const temp = (6.25 * response.user.height) + (10 * response.user.weight) - (5 * age) - 161
                    setTotalCalories(temp)
                }
                if (response.user.height === null || response.user.weight === null || response.user.dob === null) {
                    setTotalCalories(2100)
                }
            } catch (error) {
                console.log('Failed to fetch account: ', error)
                setTotalCalories(2100)
            }
        }
        getUser()
    }, [username])

    useEffect(() => {
        const getTrackingList = async () => {
            const { response, err } = await foodTrackingApi.reportCalories(dateTime, reportType, userId)
            if (response) {
                console.log(response)
                setTotal(response.total)
                const temp = (response.total / totalCalories) * 100
                setPercentage(temp)
            }
            if (err) {
                console.log(err)
                setTotal(0)
                const temp = (0 / totalCalories) * 100
                setPercentage(temp)
            }
        }
        getTrackingList()
    }, [userId, username])



    return (
        <Box sx={{
            height: '50%',
            backgroundColor: '#f7f7f7'
        }}
        >
            <Typography variant='h5' fontWeight='500' fontSize='20px' textAlign='left' sx={{
                position: 'absolute',
                top: '20px',
                left: '80px',
            }}>Tracking Progress Today</Typography>

            <Typography variant='h6' fontWeight='400' fontSize='18px' textAlign='left' sx={{
                position: 'absolute',
                top: '150px',
                left: '80px',
            }}>The amount of calories you need to take in is: {totalCalories}g</Typography>

            <Typography variant='h6' fontWeight='400' fontSize='18px' textAlign='left' sx={{
                position: 'absolute',
                top: '180px',
                left: '80px',
            }}>You loaded in today: {total}g</Typography>



            <CircularProgressbar
                value={percentage}
                text={`${total}/${totalCalories}`}
                styles={{
                    root: {
                        position: 'relative',
                        height: '250px',
                        top: '70',
                        left: '250'
                    },
                    path: {
                        stroke: '#F67416'
                    },
                    text: {
                        fill: '#2daf1b',
                        fontSize: '11px',
                        fontWeight: '500'
                    }

                }}
            />
        </Box>
    )
}

export default ProgressTracking