import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Button, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import accountsApi from '../api/modules/accounts.api'
import * as Yup from 'yup'
import userApi from '../api/modules/user.api'
import { toast } from 'react-toastify'


const Profile = () => {


    const { username } = useParams()

    const navigate = useNavigate()


    const userName = String(username)

    const [userInfo, setUserInfo] = useState({})

    const [onRequest, setOnRequest] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState(true)
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [image, setImage] = useState('')

    const form = useFormik({
        initialValues: {
            dob: '',
            email: '',
            firstName: '',
            gender: true,
            height: 0,
            id: null,
            lastName: '',
            weight: 0,
        },
    })



    useEffect(() => {
        const getAccount = async () => {
            try {
                const response = await accountsApi.getAccount(userName)
                if (response) {
                    console.log(response)
                    setUserInfo(response.user)
                    setFirstName(response.user.firstName);
                    setLastName(response.user.lastName);
                    setEmail(response.user.email);
                    setDob(response.user.dob);
                    setGender(response.user.gender)
                    setHeight(response.user.height)
                    setWeight(response.user.weight)
                    setImage(response.user.image)

                }
            } catch (error) {
                console.log('Failed to fetch account: ', error)
            }
        }
        getAccount()
    }, [userName])


    const onUpdate = async (form) => {
        form.values.firstName = firstName
        form.values.lastName = lastName
        form.values.email = email
        form.values.dob = dob
        form.values.gender = gender
        form.values.height = height
        form.values.weight = weight
        form.values.id = userInfo.id
        console.log(form.values)
        console.log(image.name)

        const { response, err } = await userApi.updateUser(image, form.values)
        if (response) {
            toast.success("Update profile successfully")
            setOnRequest(!onRequest)
            navigate('/')
        }
        if (err) {
           console.log(err)
        }
    }


    const handleClick = async () => {
        await setOnRequest(!onRequest)
    }
    const handleGenderChange = (event) => {
        const genderValue = event.target.value === 'male' ? true : false;
        setGender(genderValue)
    };
    function handleFileUpload(e) {
        setImage(e.target.files[0])
    }
    return (
        <Box>
            <Typography variant='h5' fontWeight='400' textTransform='uppercase' sx={{
                display: 'flex',
                margin: '30px 0px 10px 40px'
            }}>My profile</Typography>
            <Box sx={{
                width: '100%',
                height: '5px',
                background: 'green'
            }} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
                >
                    <Avatar alt="" src={image || (require('../images/avatar.jpg'))} sx={{
                        width: '150px',
                        height: '150px',
                        margin: '10px 0px'
                    }} />
                    {onRequest &&
                        <TextField
                            type='file'
                            onChange={handleFileUpload}
                        ></TextField>
                    }
                </Box>

                <Box component='form' width='400px'>
                    <Box sx={{
                        display: 'flex',

                    }}
                    >
                        <TextField
                            helperText={firstName.length === 0 && 'First name cannot be empty'}
                            error={firstName === ''}
                            type='text'
                            color='success'
                            label='First name'
                            value={firstName || ''}
                            sx={{
                                marginRight: '10px',
                            }}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }
                            }
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                readOnly: !onRequest,
                            }}

                        />
                        <TextField
                            type='text'
                            color='success'
                            label='Last name'
                            value={lastName  || ''}
                            onChange={(e) => setLastName(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                readOnly: !onRequest
                            }}
                            error={lastName === '' }
                            helperText={lastName.length === 0 && 'First name cannot be empty'}
                        />
                    </Box>
                    <TextField
                        color='success'
                        fullWidth
                        type='email'
                        label='Email'
                        value={email  || ''}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            margin: '10px 0'
                        }}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: !onRequest
                        }}
                        error={email === ''}
                        helperText={email.length === 0 && 'First name cannot be empty'}
                    />
                    <TextField
                        fullWidth
                        color='success'
                        label='Dafe Of Birth'
                        type='date'
                        value={dob   || ''}
                        onChange={(e) => setDob(e.target.value)}
                        error={dob === ''}
                        helperText={dob && dob.length === 0 && 'dob cannot be empty'}
                        sx={{
                            marginBottom: '10px'
                        }}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: !onRequest
                        }}
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
                            <FormControlLabel disabled={!onRequest} value='male' control={<Radio />} label='Male' />
                            <FormControlLabel disabled={!onRequest} value='female' control={<Radio />} label='Female' />
                        </RadioGroup>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <TextField
                            type='number'
                            label='Height'
                            color='success'
                            value={height  || ''}
                            onChange={(e) => setHeight(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                readOnly: !onRequest
                            }}
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                marginRight: '10px'
                            }}
                        />
                        <TextField
                            type='number'
                            label='Weight'
                            color='success'
                            value={weight  || ''}
                            onChange={(e) => setWeight(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                readOnly: !onRequest
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        marginTop: '10px'
                    }}>
                        <Button
                            fullWidth
                            sx={{
                                color: onRequest ? 'red' : '#2daf1b',
                                backgroundColor: '#ccc',
                                marginRight: '10px'
                            }}
                            onClick={() => handleClick()}
                        >
                            {onRequest ? 'Cancel' : 'Edit'}
                        </Button>
                        <Button fullWidth

                            variant='contained'
                            disabled={!onRequest}
                            onClick={() => onUpdate(form)}
                            sx={{
                                color: 'white',
                                backgroundColor: '#2daf1b',
                                ":hover": {
                                    color: 'white',
                                    backgroundColor: '#2daf1b',
                                    opacity: 0.8
                                }
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default Profile


