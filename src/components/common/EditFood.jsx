import { Autocomplete, Box, Button, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import categoryApi from '../../api/modules/category.api';
import { useFormik } from 'formik';
import foodApi from '../../api/modules/foods.api';
import { toast } from 'react-toastify';




const EditFood = ({ id, onClose }) => {

    const [categoryList, setCategoryList] = useState([])
    const [selectedValue, setSelectedValue] = useState(categoryList[0]);
    const [inputValue, setInputValue] = useState('');
    const [image, setImage] = useState('')
    const [carb, setCarb] = useState(0)
    const [fat, setFat] = useState(0)
    const [protein, setProtein] = useState(0)
    const [energyPer, setEnergyPer] = useState(0)
    const [desc, setDesc] = useState('')
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(true)


    const form = useFormik({
        initialValues: {
            id: 0,
            category: {},
            carb: 0,
            description: '',
            energyPerServing: 0,
            fat: 0,
            name: '',
            protein: 0,
        }
    })

    useEffect(() => {
        const getCategory = async () => {
            const { response, err } = await foodApi.getFood(id)
            if (response) {
                setName(response.name)
                setSelectedValue(response.category)
                setDesc(response.description)
                setEnergyPer(response.energyPerServing)
                setCarb(response.carb)
                setFat(response.fat)
                setProtein(response.protein)
                console.log(response)
                setIsLoading(false)
            }
            if (err) console.log(err)
        }
        getCategory()
    }, [])

    const onUpdate = async (form) => {
        form.values.category = selectedValue
        form.values.carb = Number(carb)
        form.values.description = desc
        form.values.energyPerServing = Number(energyPer)
        form.values.fat = Number(fat)
        form.values.name = name
        form.values.protein = Number(protein)
        form.values.id = id

        console.log(form.values)
        console.log(image.name)

        const { response, err } = await foodApi.updateFood(image, form.values)
        if (response) toast.success("Update food successfully")
        if (err) console.log(err)

    }


    useEffect(() => {
        const getCategory = async () => {
            const { response, err } = await categoryApi.listCategories()
            if (response) {
                setCategoryList(response)
                console.log(response)
            }
            if (err) console.log(err)
        }
        getCategory()
    }, [selectedValue])

    function handleFileUpload(e) {
        setImage(e.target.files[0])
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                maxWidth: '500px',
                height: '630px',
                backgroundColor: '#f8f8f8',
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)'
            }}
        >
            {isLoading && <CircularProgress
                sx={{
                    color: 'green',
                    margin: 'calc(450px / 2)',
                    width: '100px',
                    height: '100px'
                }} />}
            {!isLoading && (
                <>
                    <Box display='flex'
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        justifyContent={{ xs: 'center', sm: 'end' }}
                    >
                        <Button
                            sx={{
                                color: 'red',
                                marginBottom: '20px'
                            }}
                            onClick={onClose}
                        >
                            <CloseOutlinedIcon />
                        </Button>
                    </Box>
                    <Box display='flex'
                        flexDirection='row'
                        justifyContent='center'>
                        <Autocomplete
                            disablePortal
                            value={selectedValue || null}
                            onChange={(event, values) => {
                                setSelectedValue(values);
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            options={categoryList}
                            getOptionLabel={(categoryList) => categoryList.name}
                            sx={{
                                marginBottom: '10px',
                                width: { xs: '100%', sm: '98%' }
                            }}
                            renderInput={(params) => <TextField {...params} label="Category" />}
                        />
                    </Box>
                    <Box
                    >
                        <TextField
                            type='text'
                            label='Name'
                            color='success'
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            sx={{
                                marginBottom: '10px',
                                width: { xs: '100%', sm: '98%' }
                            }}
                            error={name.length === 0}
                            helperText={name.length === 0 && 'Name cannot be empty'}
                        />
                    </Box>
                    <Box
                    >
                        <TextField
                            type='number'
                            label='Carb'
                            color='success'
                            value={carb}
                            onChange={(e) => {
                                setCarb(e.target.value)
                            }}
                            sx={{
                                marginRight: '10px',
                                marginBottom: '10px',
                                width: { xs: '100%', sm: '48%' }
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <TextField
                            type='number'
                            label='Fat'
                            color='success'
                            value={fat}
                            onChange={(e) => {
                                setFat(e.target.value)
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            sx={{
                                width: { xs: '100%', sm: '48%' }
                            }}
                        />
                    </Box>
                    <Box
                    >
                        <TextField
                            type='number'
                            label='Protein'
                            color='success'
                            value={protein}
                            onChange={(e) => {
                                setProtein(e.target.value)
                            }}
                            sx={{
                                marginBottom: '10px',
                                marginRight: '10px',
                                width: { xs: '100%', sm: '48%' }
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <TextField
                            type='number'
                            label='Energy Per Serving'
                            color='success'
                            value={energyPer}
                            onChange={(e) => {
                                setEnergyPer(e.target.value)
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            sx={{
                                width: { xs: '100%', sm: '48%' }
                            }}
                        />
                    </Box>
                    <TextField
                        type='file'
                        onChange={handleFileUpload}
                        sx={{
                            marginBottom:'10px',
                            width: { xs: '100%', sm: '98%' }
                        }} />
                    <TextField
                        type='text'
                        label='Description'
                        multiline
                        rows={6}
                        value={desc}
                        onChange={(e) => {
                            setDesc(e.target.value)
                        }}
                        sx={{
                            marginBottom:'10px',
                            width: { xs: '100%', sm: '98%' }
                        }} />
                    <Box>
                        <Button variant='contained' sx={{
                            backgroundColor: '#2daf1b',
                            width: '430px',
                            ":hover": {
                                backgroundColor: '#2daf1b',
                                opacity: '0.8'
                            }
                        }}
                            onClick={() => onUpdate(form)}
                        >Save</Button>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default EditFood