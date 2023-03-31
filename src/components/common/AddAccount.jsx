import { Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import authApi from '../../api/modules/auth.api'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { toast } from 'react-toastify';



const AddAccount = ({ onClose }) => {

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('')

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

    const { response, err } = await authApi.register(form.values)
    if (err) {
      toast.error(err.message)
    }
    else{
      toast.success("Add account successfully")
    }
  }

  const handleGenderChange = (event) => {
    const roleValue = event.target.value === 'ROLE_USER' ? 'ROLE_USER' : 'ROLE_ADMIN';
    setRole(roleValue)
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '500px',
        height: '550px',
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
            console.log(lastName)
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
          width: '430px',
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
          width: '430px',
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
        error={password.length === 0}
        helperText={password.length === 0 && 'Password cannot be empty'}
        sx={{
          width: '430px',
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
    </Box>
  )
}

export default AddAccount