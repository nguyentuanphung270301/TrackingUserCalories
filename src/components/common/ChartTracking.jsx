import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import accountsApi from '../../api/modules/accounts.api';
import foodTrackingApi from '../../api/modules/foodtracking.api';
import {
    Chart as ChartJS,
    CategoryScale,
    LineController,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { routesGen } from '../../routes/routes';

ChartJS.register(
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChartTracking = () => {
    const username = useSelector((state) => state.user.username) || localStorage.getItem('username')
    const [userId, setUserId] = useState(null)
    const [chartData, setChartData] = useState(null)

    const [isLoading, setIsLoading] = useState(true)


    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const dateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    const date = `${year}-${month}-${day} `;

    console.log(dateTime);

    const reportType = 'day';

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await accountsApi.getAccount(username)
                setUserId(response.user.id)
                console.log(response)
            } catch (error) {
                console.log('Failed to fetch account: ', error)
            }
        }
        getUser()
    }, [username])

    useEffect(() => {
        const getTrackingList = async () => {
            const { response, err } = await foodTrackingApi.reportCalories(dateTime, reportType, userId)
            if (response) {
                console.log(response)
                setChartData({
                    labels: Object.keys(response.columnData),
                    datasets: [
                        {
                            label: "Consumed Calories",
                            data: Object.values(response.columnData),
                            fill: false,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ],
                })
                setIsLoading(false)
            }
            if (err) {
                console.log(err)
                setIsLoading(false)
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
                backgroundColor: '#f7f7f7',
                borderRadius: '5px'
            }}>
            <Box display='flex' justifyContent='space-between' alignItems='center' sx={{
                backgroundColor: 'white',
                marginTop: '10px',
                height: '60px',
            }}>
                <Typography variant='h5' fontWeight='500' fontSize='20px' textAlign='left' sx={{
                    margin: '20px',
                    width: '50%'
                }}>Chart for today {`(${date})`}</Typography>
                <Typography variant='button' fontWeight='500' fontSize='16px' sx={{
                    marginRight: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    textDecoration: "none", color: "inherit",
                    ":hover": {
                        color: 'white',
                        backgroundColor: 'green'
                    }
                }}
                    component={Link}
                    to={routesGen.detailchart}
                >Show All</Typography>
            </Box>

            <Box sx={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isLoading && <CircularProgress sx={{
                    color: 'green',
                    margin: 'auto',
                    width: '100px',
                    height: '100px'
                }} />}
                {!isLoading && (
                    <>
                        {chartData ? <Chart type='line' data={chartData} /> :
                            <Typography variant='body1' fontSize='18px'>No data available today</Typography>
                        }
                    </>
                )}

            </Box>
        </Box>

    )
}
export default ChartTracking