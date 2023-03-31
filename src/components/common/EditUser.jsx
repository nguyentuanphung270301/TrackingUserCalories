import { Autocomplete, Box, Button, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material'
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

        const {response , err } = await userApi.updateUser(image , form.values)
        if(response) {
          toast.success('Update user successfully')
        }
        if(err) console.log(err)
    }

    useEffect(() => {
      const getUser = async () => {
        const {response ,err} = await userApi.getUser(id)
        if(response) {
          setFirstName(response.firstName)
          setLastName(response.lastName)
          setEmail(response.email)
          setDob(response.dob)
          setGender(response.gender)
          setHeight(response.height)
          setWeight(response.weight)

        }
        if(err) console.log(err)
      }
      getUser()
    },[])

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
                        marginRight: '10px'
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
                    width: '430px',
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
                    width: '430px',
                    marginTop: '5px'
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
                        width: '210px'
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
                        width: '210px'
                    }}
                />
            </Box>
            <TextField
                type='file'
                onChange={handleFileUpload}
                sx={{
                    margin: '10px 0px',
                    width: '430px'
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

export default EditUSer