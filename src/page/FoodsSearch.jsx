import { Box, Button, CircularProgress, Grid, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import foodApi from '../api/modules/foods.api'
import categoryApi from '../api/modules/category.api'
import FoodItems from '../components/common/FoodItems'
import CategoryItem from '../components/common/CategoryItem'
import { toast } from 'react-toastify'

let timer

const timeout = 500

const FoodsSearch = () => {

    const [onSelected, setOnSelected] = useState('category')
    const [query, setQuery] = useState('')
    const [filteredResult, setFilteredResult] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    const onChangeSelected = (item) => setOnSelected(item)

    useEffect(() => {
        const getResult = async () => {
            if (onSelected === 'food') {
                setIsLoading(true)
                const { response, err } = await foodApi.listFoods()
                if (response) {
                    const filteredResult = response.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
                    setFilteredResult(filteredResult)
                    setIsLoading(false)
                }
                if (err) toast.error('Please login')
                console.log(filteredResult)
            }
            if (onSelected === 'category') {
                setIsLoading(true)
                const { response, err } = await categoryApi.listCategories()
                if (response) {
                    const filteredResult = response.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
                    setFilteredResult(filteredResult)
                    setIsLoading(false)
                }
                if (err) toast.error('Please login')
                console.log(filteredResult)
            }

        }
        getResult()
    }, [query, onSelected])


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
            <Box sx={{
                backgroundColor: 'white',
                width: 'calc(100vw - 80px)',
                height: '100%',
                position: 'absolute'
            }}>
                <Stack spacing={2}>
                    <Stack
                        spacing={2}
                        direction='row'
                        justifyContent='center'
                        sx={{ width: '100%', marginTop: '50px' }}
                    >
                        <Button
                            size='large'
                            variant={onSelected === 'category' ? 'contained' : 'text'}
                            sx={{
                                color: onSelected === 'category' ? 'white' : '#2daf1b',
                                background: onSelected === 'category' ? '#2daf1b' : 'white',
                                ":hover": {
                                    opacity: 0.9,
                                    background: onSelected === 'category' ? '#2daf1b' : 'white',
                                }
                            }}
                            onClick={() => onChangeSelected('category')}
                        >
                            Category
                        </Button>
                        <Button
                            size='large'
                            variant={onSelected === 'food' ? 'contained' : 'text'}
                            sx={{
                                color: onSelected === 'food' ? 'white' : '#2daf1b',
                                background: onSelected === 'food' ? '#2daf1b' : 'white',
                                ":hover": {
                                    opacity: 0.9,
                                    background: onSelected === 'food' ? '#2daf1b' : 'white',
                                }
                            }}
                            onClick={() => onChangeSelected('food')}
                        >
                            Food
                        </Button>
                    </Stack>
                    <TextField
                        placeholder='Search'
                        autoFocus
                        variant='outlined'
                        color='success'
                        sx={{
                            padding: '0px 40px',
                        }}
                        onChange={onQueryChange}
                    />
                </Stack>
                <Box sx={{
                    flexGrow: 1,
                    margin: '40px 0px 0px 120px',
                    width: '1300px'
                }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} flexDirection='row' width='1380px'>
                        {isLoading && <CircularProgress sx={{
                            color: 'green',
                            marginLeft: 'calc(1380px / 2)',
                            marginTop: '300px',
                            width: '100px',
                            height: '100px'
                        }} />}
                        {!isLoading && (
                            <>
                                {onSelected === 'category' && <CategoryItem category={filteredResult} request={query} />}
                                {onSelected === 'food' && <FoodItems foods={filteredResult} request={query} />}
                            </>
                        )}
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default FoodsSearch