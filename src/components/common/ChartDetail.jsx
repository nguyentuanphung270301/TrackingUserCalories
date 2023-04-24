import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import accountsApi from '../../api/modules/accounts.api';
import foodTrackingApi from '../../api/modules/foodtracking.api';


import {
    Chart as ChartJS,
    DoughnutController,
    CategoryScale,
    ArcElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
ChartJS.register(
    ArcElement,
    DoughnutController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChartDetail = () => {

    const username = useSelector((state) => state.user.username) || localStorage.getItem('username')
    const [reportType, setReportType] = useState('day')
    const [chartData, setChartData] = useState(null)
    const [DoughnutData, setDoughnutData] = useState(null)
    const [report, setReport] = useState(null)

    const options = ["day", "week", "month", "year"];

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateTime = `${year}-${month}-${day}`
    const [date, setDate] = useState(dateTime)
    const [userId, setUserId] = useState(null)

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

    const onGo = async () => {
        const { response, err } = await foodTrackingApi.reportCalories(`${date} 00:00:00`, reportType, userId)
        if (response) {
            console.log(response)
            setReport(response)
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
            let consumedHistory = response.consumedHistory;
            let totalNutrition = { carb: 0, fat: 0, protein: 0 };

            for (let i = 0; i < consumedHistory.length; i++) {
                let food = consumedHistory[i].food;
                let consumedGram = consumedHistory[i].consumedGram;

                totalNutrition.carb += (food.carb / 100) * consumedGram;
                totalNutrition.fat += (food.fat / 100) * consumedGram;
                totalNutrition.protein += (food.protein / 100) * consumedGram;
            }

            console.log(totalNutrition);
            setDoughnutData({
                labels: Object.keys(totalNutrition),
                datasets: [
                    {
                        label: 'Consumed',
                        data: Object.values(totalNutrition),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1,
                    },
                ],
            })
        }
        if (err) {
            console.log(err)
            setChartData(null)
            setDoughnutData(null)
        }
    }

    return (
        <Box sx={{
            position: 'relative',
            height: '100%',
            width: 'calc(100vw - 60 px)',
        }}>
            <Typography variant='h4' fontWeight='500' textTransform='uppercase' margin='20px 0px 40px 0px'>tracking stats </Typography>
            <Box sx={{
                display: 'flex',
                width: '600px',
                margin: 'auto',
                marginBottom: '40px',
                justifyContent: 'space-between',
                height: '50px'
            }}>
                <TextField
                    type='date'
                    color='success'
                    value={date || ''}
                    onChange={(e) => {
                        setDate(e.target.value)
                    }}
                    sx={{
                        width: '200px',
                        height: '100%important'
                    }}
                />
                <Autocomplete
                    value={reportType}
                    onChange={(event, newValue) => {
                        setReportType(newValue);
                    }}
                    options={options}
                    renderInput={(params) => <TextField {...params} label="Select option" />}
                    sx={{
                        width:'200px'
                    }}
                />
                <Button variant='contained'
                    sx={{
                        width: '100px',
                        height: '56px',
                        backgroundColor: 'green',
                        marginBottom: '20px',
                        ":hover": {
                            backgroundColor: 'green',
                            opacity: 0.8
                        }
                    }}
                    onClick={onGo}
                >Go</Button>
            </Box>
            <Box sx={{
                width: '1000px',
                height: '500px',
                margin: 'auto',
                marginBottom: '60px',
            }}>
                <Typography variant='h6' textAlign='left'>Calorie Consumption Chart</Typography>
                {chartData ? <Chart type='line' data={chartData} /> :
                    <Typography variant='body1' fontSize='18px'>No data available</Typography>
                }
            </Box>
            <Box sx={{
                width: '500px',
                height: '500px',
                margin: 'auto',
                marginBottom: '60px',
            }}>
                {DoughnutData ? <Chart type='doughnut' data={DoughnutData} /> :
                    <Typography variant='body1' fontSize='18px'>No data available</Typography>
                }
            </Box>
            <Box sx={{
                width: '300px',
                height: '500px',
                margin: 'auto',
            }}>
                <Typography variant='h6' marginBottom='40px'>Energy Summary</Typography>
                <Box sx={{
                    display: 'flex',
                    width: '300px',
                    height: '40px',
                    justifyContent: 'center'
                }}>
                    <ElectricBoltOutlinedIcon sx={{
                        color: '#00BD35',
                        marginRight: '10px'
                    }} />
                    <Typography variant='body1' marginRight='40px' width='50px'> Max:</Typography>
                    <Typography width='50px'> {report && report.max.toFixed(2)}</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    width: '300px',
                    height: '40px',
                    justifyContent: 'center'
                }}>
                    <ElectricBoltOutlinedIcon sx={{
                        color: '#FF0000',
                        marginRight: '10px'
                    }} />
                    <Typography variant='body1' marginRight='40px' width='50px'> Min:</Typography>
                    <Typography width='50px'> {report && report.min.toFixed(2)}</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    width: '300px',
                    height: '40px',
                    justifyContent: 'center'
                }}>
                    <ElectricBoltOutlinedIcon sx={{
                        color: '#F8B200',
                        marginRight: '10px'
                    }} />
                    <Typography variant='body1' marginRight='40px' width='50px'> Average:</Typography>
                    <Typography width='50px'> {report && report.average.toFixed(2)}</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    width: '300px',
                    height: '40px',
                    justifyContent: 'center'
                }}>
                    <ElectricBoltOutlinedIcon sx={{
                        color: '#7142FF',
                        marginRight: '10px'
                    }} />
                    <Typography variant='body1' marginRight='40px' width='50px'> Total:</Typography>
                    <Typography width='50px'> {report && report.total.toFixed(2)}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default ChartDetail