import { Autocomplete, Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import categoryApi from '../../api/modules/category.api';
import { useFormik } from 'formik';
import foodApi from '../../api/modules/foods.api';
import { toast } from 'react-toastify';




const AddFood = ({ onClose }) => {

    const [categoryList, setCategoryList] = useState([])
    const [selectedValue, setSelectedValue] = useState(categoryList[0]);
    const [inputValue, setInputValue] = useState('');
    const [Image, setImage] = useState('')
    const [carb, setCarb] = useState(0)
    const [fat, setFat] = useState(0)
    const [protein, setProtein] = useState(0)
    const [energyPer, setEnergyPer] = useState(0)
    const [desc, setDesc] = useState('')
    const [Name, setName] = useState('')




    const form = useFormik({
        initialValues: {
            id: 0,
            category: { 'id': 0 },
            carb: 0,
            description: '',
            energyPerServing: 0,
            fat: 0,
            name: '',
            protein: 0,
        }
    })



    const onSave = async (form) => {
        form.values.carb = Number(carb)
        form.values.description = desc
        form.values.energyPerServing = Number(energyPer)
        form.values.fat = Number(fat)
        form.values.name = Name
        form.values.protein = Number(protein)
        form.values.id = 0
        form.values.category.id = selectedValue.id

        console.log(form.values)
        console.log(Image.name)

        const { response, err } = await foodApi.createFood(Image, form.values)
        if (response) toast.success("Add food successfully")
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
            <Box display='flex'
                flexDirection='row'
                justifyContent='end'
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
                    sx={{ marginBottom: '10px', width: { xs: '100%', sm: '98%' } }}
                    renderInput={(params) => <TextField {...params} label="Category" />}
                />
            </Box>
            <Box s
            >
                <TextField
                    type='text'
                    label='Name'
                    color='success'
                    value={Name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    sx={{
                        marginBottom: '10px',
                        width: { xs: '100%', sm: '98%' }
                    }}
                    error={Name.length === 0}
                    helperText={Name.length === 0 && 'Name cannot be empty'}
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
            <Box display='flex'
                flexDirection='row'
                justifyContent='center'
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
                marginBottom: '10px',
                width: { xs: '100%', sm: '98%' }
              }} />
            <TextField
                type='text'
                label='Description'
                multiline
                rows={5}
                value={desc}
                onChange={(e) => {
                    setDesc(e.target.value)
                }}
                sx={{
                marginBottom: '10px',
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
                    onClick={() => onSave(form)}
                >Save</Button>
            </Box>
        </Box>
    )
}

export default AddFood