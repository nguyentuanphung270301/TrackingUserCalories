import { LoadingButton } from '@mui/lab'
import { Avatar, Box, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import categoryApi from '../../api/modules/category.api'
import foodApi from '../../api/modules/foods.api'
import TrackingCategoryList from './TrackingCategoryList'
import TrackingFoodList from './TrackingFoodList'

let timer

const timeout = 500

const TrackingLeft = () => {

    const username = localStorage.getItem('username')
    const [cateList, setCateList] = useState(null)
    const [cateId, setCateId] = useState(null)
    const [filteredResult, setFilteredResult] = useState(null)
    const [isRequest, setIsRequest] = useState(null)
    const [query, setQuery] = useState('')
    const [isLoadingCategory, setIsLoadingCategory] = useState(true)
    const [isLoadingFood, setIsLoadingFood] = useState(true)

    const handleSelectedCategoryChange = (selectedId) => {
        setCateId(selectedId);
    }

    const handleIsReuest = (request) => {
        setIsRequest(request)
    }


    useEffect(() => {
        const getCateList = async () => {
            const { response, err } = await categoryApi.listCategories()
            if (response) {
                setCateList(response)
                setIsLoadingCategory(false)
            }
            if (err) console.log(err)
        }
        getCateList()
    }, [])

    useEffect(() => {
        const getResult = async () => {
            if (cateId !== null) {
                const { response, err } = await foodApi.listFoodsWithCategory(cateId)
                if (response) setFilteredResult(response)
                if (err) console.log(err)
                setIsLoadingFood(false)
            }
            if (isRequest === null && query === '') {
                const { response, err } = await foodApi.listFoods()
                if (response) {
                    setFilteredResult(response)
                    setIsLoadingFood(false)
                }
                if (err) console.log(err)
            }
            if (query !== '') {
                setIsLoadingFood(true)
                const { response, err } = await foodApi.listFoods()
                if (response) {
                    const filteredResult = response.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
                    setFilteredResult(filteredResult)
                    setIsLoadingFood(false)
                }
                if (err) console.log(err)
            }
        }
        getResult()
    }, [cateId, isRequest, query])



    const onQueryChange = (e) => {
        const newQuery = e.target.value
        clearTimeout(timer)

        timer = setTimeout(() => {
            setQuery(newQuery)
            console.log(query)
        }, timeout)
    }

    return (
        <>
            <Box display='flex' justifyContent='space-between' alignItems='center' margin='15px 0px'>
                <Typography
                    variant='h5'
                    marginLeft='40px'
                    fontWeight='500'
                    width='200px'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >Today Menu <Avatar src={require('../../images/icons8-savouring-delicious-food-face-96.png')} /></Typography>
                <TextField
                    placeholder='Search by food name'
                    autoFocus
                    variant='outlined'
                    color='success'
                    sx={{
                        marginRight: '40px',
                        width: '400px'
                    }}
                    onChange={onQueryChange}
                />
            </Box>
            <Box
                sx={{
                    width: '916px',
                    height: '200px',
                    margin: '0px 0px 0px 40px',
                    position: 'relative'
                }}>
                <img alt='Ảnh' src={require('../../images/trackingwallpaper.jpg')} style={{
                    width: '916px',
                    height: '200px',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                    objectFit: 'cover'
                }} />
                <Typography
                    variant='h5'
                    fontWeight='500'
                    color='black'
                    sx={{
                        position: 'absolute',
                        top: '20%',
                        left: '5%',
                    }}
                >{`Hello, ${username}`}</Typography>
                <Typography
                    variant='h7'
                    fontWeight='500'
                    color='white'
                    sx={{
                        position: 'absolute',
                        top: '35%',
                        left: '5%',
                    }}
                >Let's add this dish to your menu today</Typography>
            </Box>
            <Box
                position='absolute'
                sx={{
                    width: '916px',
                    height: '400px',
                    margin: '20px 0px 0px 40px',
                }}
            >
                <Typography
                    variant='h5'
                    fontWeight='500'
                    sx={{
                        float: 'left'
                    }}
                >Menu Category</Typography>
                {isLoadingCategory && <CircularProgress sx={{
                    color: 'green',
                    marginTop: '50px',
                    width: '100px',
                    height: '100px'
                }} />}
                {!isLoadingCategory && (
                    <>
                        <Box
                            sx={{
                                flexGrow: 1,
                                marginBottom: '20px'
                            }}>
                            <Grid container spacing={{ xs: 2 }} display='block'>
                                <Grid item xs display='flex' overflow='auto'
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
                                        width: "916px",
                                        marginLeft: "15px",
                                        padding: '0!important'
                                    }}
                                >
                                    <TrackingCategoryList category={cateList} onSelectedCategoryChange={handleSelectedCategoryChange} onRequest={handleIsReuest} />
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                )}
                <Box
                    sx={{
                        display: "flex"
                    }}>
                    <Grid container spacing={2} display='block'>
                        <Grid item xs display='flex' overflow='auto'
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
                                width: "916px",
                                marginLeft: "15px",
                                padding: '0!important'
                            }}
                        >
                            {isLoadingFood && <CircularProgress sx={{
                                color: 'green',
                                margin: '50px 0px 0px 500px',
                                width: '100px',
                                height: '100px'
                            }} />}
                            {!isLoadingFood && (
                                <>
                                    <TrackingFoodList foods={filteredResult} />
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default TrackingLeft