import { Autocomplete, Box, Button, CircularProgress, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useFormik } from 'formik';
import userApi from '../../api/modules/user.api';
import { toast } from 'react-toastify';


const EditUSer = ({ id, onClose }) => {

    const [dob, setDob] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState(true)
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [image, setImage] = useState('')
    const [isLoading, setIsLoading] = useState(true)


    const form = useFormik({
        initialValues: {
            id: '',
            dob: '',
            email: '',
            firstName: '',
            lastName: '',
            gender: true,
            height: 0,
            weight: 0
        }
    })



    const onSave = async (form) => {
        form.values.dob = dob
        form.values.email = email
        form.values.firstName = firstName
        form.values.lastName = lastName
        form.values.gender = gender
        form.values.height = height
        form.values.weight = weight
        form.values.id = id

        console.log(form.values)
        console.log(image.name)

        const { response, err } = await userApi.updateUser(image, form.values)
        if (response) {
            toast.success('Update user successfully')
        }
        if (err) console.log(err)
    }

    useEffect(() => {
        const getUser = async () => {
            const { response, err } = await userApi.getUser(id)
            if (response) {
                setFirstName(response.firstName)
                setLastName(response.lastName)
                setEmail(response.email)
                setDob(response.dob)
                setGender(response.gender)
                setHeight(response.height)
                setWeight(response.weight)
                setIsLoading(false)
            }
            if (err) console.log(err)
        }
        getUser()
    }, [])

    function handleFileUpload(e) {
        setImage(e.target.files[0])
    }

    const handleGenderChange = (event) => {
        const genderValue = event.target.value === 'male' ? true : false;
        setGender(genderValue)
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                width: '600px',
                height: '600px',
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
                    <Box
                        display='flex'
                        flexDirection='row'
                        justifyContent='center'
                        margin='10px 0px'
                    >
                        <TextField
                            type='text'
                            label='First name'
                            color='success'
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
                            sx={{
                                marginRight: '10px',
                                marginBottom: '10px',
                                width: { xs: '100%', sm: '48%' }
                            }}
                            error={firstName.length === 0}
                            helperText={firstName.length === 0 && 'First name cannot be empty'}
                        />
                        <TextField
                            type='text'
                            label='Last name'
                            color='success'
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                            sx={{
                                width: { xs: '100%', sm: '48%' }
                            }}
                            error={lastName.length === 0}
                            helperText={lastName.length === 0 && 'Last name cannot be empty'}
                        />
                    </Box>
                    <TextField
                        type='email'
                        label='Email'
                        color='success'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        error={email.length === 0}
                        helperText={email.length === 0 && 'Email cannot be empty'}
                        sx={{
                            width: { xs: '100%', sm: '98%' },
                            marginBottom: '10px'
                        }}
                    />
                    <TextField
                        type='date'
                        label='Date of birth'
                        color='success'
                        value={dob || ''}
                        onChange={(e) => {
                            setDob(e.target.value)
                        }}
                        sx={{
                            width: { xs: '100%', sm: '98%' },
                            marginBottom: '10px'
                        }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Box>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                            row
                            value={gender ? 'male' : 'female'}
                            sx={{
                                justifyContent: 'center',
                                marginBottom: '10px'
                            }}
                            onChange={handleGenderChange}
                        >
                            <FormControlLabel value='male' control={<Radio />} label='Male' />
                            <FormControlLabel value='female' control={<Radio />} label='Female' />
                        </RadioGroup>
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='row'
                        justifyContent='center'
                        margin='10px 0px'
                    >
                        <TextField
                            type='number'
                            label='Height'
                            color='success'
                            value={height || ''}
                            onChange={(e) => setHeight(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                            }}
                            sx={{
                                marginRight: '10px',
                                marginBottom: '10px',
                                width: { xs: '100%', sm: '48%' }
                            }}
                        />
                        <TextField
                            type='number'
                            label='Weight'
                            color='success'
                            value={weight || ''}
                            onChange={(e) => setWeight(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
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
                                width: { xs: '100%', sm: '98%' },
                                marginBottom: '10px'
                            }}/>
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
                </>
            )}
        </Box>
    )
}

export default EditUSer