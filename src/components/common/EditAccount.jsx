import { Box, Button, CircularProgress, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import authApi from '../../api/modules/auth.api'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { toast } from 'react-toastify';
import accountsApi from '../../api/modules/accounts.api';


const EditAccount = ({ id, onClose }) => {

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const form = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      role: ''
    }
  })
  const onSave = async (form) => {
    form.values.email = email
    form.values.firstName = firstName
    form.values.lastName = lastName
    form.values.username = username
    form.values.password = password
    form.values.role = role

    console.log(form.values)

    const { response, err } = await accountsApi.updateAccount(form.values)
    if (response) toast.success("Update account successfully")
    if (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    const getAccount = async () => {
      try {
        const response = await accountsApi.getAccount(id.id)
        console.log(response)
        setFirstName(response.user.firstName)
        setLastName(response.user.lastName)
        setEmail(response.user.email)
        setUsername(response.username)
        setRole(response.role)
        setIsLoading(false)
      }
      catch (err) {
        console.log(err)
      }
    }
    getAccount()
  }, [])

  const handleGenderChange = (event) => {
    const roleValue = event.target.value === 'ROLE_USER' ? 'ROLE_USER' : 'ROLE_ADMIN';
    setRole(roleValue)
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        maxWidth: '500px',
        height: '550px',
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
            sx={{
              marginBottom: '10px'
            }}
          >
            <TextField
              type='text'
              label='First name'
              color='success'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
                console.log(firstName)
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
                console.log(lastName)
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
              console.log(email)
            }}
            error={email.length === 0}
            helperText={email.length === 0 && 'Email cannot be empty'}
            sx={{
              width: { xs: '100%', sm: '98%' },
              marginBottom: '10px'
            }}
          />
          <TextField
            type='text'
            label='Username'
            color='success'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              console.log(username)
            }}
            error={username.length === 0}
            helperText={username.length === 0 && 'Username cannot be empty'}
            sx={{
              width: { xs: '100%', sm: '98%' },
              marginBottom: '10px'
            }}
          />
          <TextField
            type='password'
            label='Password'
            color='success'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              console.log(password)
            }}
            error={password.length === 0 || password.length < 5}
            helperText={(password.length === 0 && 'Password cannot be empty') || (password.length < 5 && 'Password must be at least 5 characters')}
            sx={{
              width: { xs: '100%', sm: '98%' },
              marginBottom: '10px'
            }}
          />
          <Box>
            <FormLabel>Role</FormLabel>
            <RadioGroup
              row
              value={role}
              sx={{
                justifyContent: 'center',
                marginBottom: '10px'
              }}
              onChange={handleGenderChange}
            >
              <FormControlLabel value='ROLE_USER' control={<Radio />} label='ROLE_USER' />
              <FormControlLabel value='ROLE_ADMIN' control={<Radio />} label='ROLE_ADMIN' />
            </RadioGroup>
          </Box>
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

export default EditAccount