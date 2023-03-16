import { Box, Button, Grid, Stack, TextField, Toolbar } from '@mui/material'
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


    const onChangeSelected = (item) => setOnSelected(item)

    useEffect(() => {
        const getResult = async () => {
            if (query !== '') {
                if (onSelected === 'food') {
                    const { response, err } = await foodApi.listFoods()
                    if (response) {
                        const filteredResult = response.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
                        setFilteredResult(filteredResult)
                    }
                    if (err) toast.error('Please login')
                    console.log(filteredResult)
                }
                if (onSelected === 'category') {
                    const { response, err } = await categoryApi.listCategories()
                    if (response) {
                        const filteredResult = response.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
                        setFilteredResult(filteredResult)
                    }
                    if (err) toast.error('Please login')
                    console.log(filteredResult)
                }
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
                width: '1420px',
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
                <Box >

                    <Grid container spacing={2} margin='10px 0px 0px 40px '>
                        <Grid item xs={10}>
                        </Grid>
                        {onSelected==='category' && <CategoryItem category={filteredResult} request={query}/>}
                        {onSelected==='food' && <FoodItems foods={filteredResult} request={query}/>}
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default FoodsSearch