import React from 'react'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import authApi from "../../api/modules/auth.api";
import { toast } from "react-toastify";
import { Alert, Box, Button, Stack, TextField } from '@mui/material'
import { LoadingButton } from "@mui/lab";
import { setUser } from "../../redux/features/userSlice";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";


const RegisterForm = ({ switchAuthState }) => {
    const dispatch = useDispatch()

    const [isLoginRequest, setIsLoginRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState();


    const registerForm = useFormik({
        initialValues: {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            role: "ROLE_USER",
            username: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().min(8, 'username minimum 8 characters').required('username is required'),
            firstName: Yup.string().required('first name is required'),
            lastName: Yup.string().required('last name is required'),
            password: Yup.string().min(8, 'password minium 8 characters').required('password is required'),
            email: Yup.string().email('Invalid email address').required('email is required'),
        }),
        onSubmit: async values => {
            setErrorMessage(undefined)
            setIsLoginRequest(true)
            const { response, err } = await authApi.register(values)
            console.log(response)
            setIsLoginRequest(false)

            if (response) {
                registerForm.resetForm()
                console.log(values)
                dispatch(setUser(response))
                dispatch(setAuthModalOpen(false))
                toast.success("Register in success")
            }

            if (err) {
                toast.error(err.message)
            }

        }
    })

    return (
        <Box component='form' onSubmit={registerForm.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    type="text"
                    placeholder="username"
                    name="username"
                    fullWidth
                    value={registerForm.values.username}
                    onChange={registerForm.handleChange}
                    color="success"
                    error={registerForm.touched.username && registerForm.errors.username !== undefined}
                    helperText={registerForm.touched.username && registerForm.errors.username}
                />

                <TextField
                    type="password"
                    placeholder="password"
                    name="password"
                    fullWidth
                    value={registerForm.values.password}
                    onChange={registerForm.handleChange}
                    color="success"
                    error={registerForm.touched.password && registerForm.errors.password !== undefined}
                    helperText={registerForm.touched.password && registerForm.errors.password}
                />

                <TextField
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    fullWidth
                    value={registerForm.values.firstName}
                    onChange={registerForm.handleChange}
                    color="success"
                    error={registerForm.touched.firstName && registerForm.errors.firstName !== undefined}
                    helperText={registerForm.touched.firstName && registerForm.errors.firstName}
                />

                <TextField
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    fullWidth
                    value={registerForm.values.lastName}
                    onChange={registerForm.handleChange}
                    color="success"
                    error={registerForm.touched.lastName && registerForm.errors.lastName !== undefined}
                    helperText={registerForm.touched.lastName && registerForm.errors.lastName}
                />

                <TextField
                    type="email"
                    placeholder="email"
                    name="email"
                    fullWidth
                    value={registerForm.values.email}
                    onChange={registerForm.handleChange}
                    color="success"
                    error={registerForm.touched.email && registerForm.errors.email !== undefined}
                    helperText={registerForm.touched.email && registerForm.errors.email}
                />
            </Stack>
            <LoadingButton
                type='submit'
                fullWidth
                size='large'
                variant='contained'
                sx={{
                    marginTop: 4,
                    backgroundColor: '#2daf1b',
                    ":hover": {
                        backgroundColor: '#2daf1b',
                        opacity: 0.7
                    }
                }}
                loading={isLoginRequest}
            >
                Register
            </LoadingButton>

            <Button
                fullWidth
                sx={{
                    marginTop: 1,
                    color: '#2daf1b'
                }}
                onClick={() => switchAuthState()}
            >
                login
            </Button>

            {errorMessage && (
                <Box sx={{ marginTop: 2 }}>
                    <Alert severity='error' variant='outlined'>{errorMessage}</Alert>
                </Box>
            )}

        </Box>
    )

}

export default RegisterForm