import React, { useState } from 'react'
import { Box, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import accountsApi from '../api/modules/accounts.api'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../redux/features/userSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'



const UpdatePassword = () => {
    const [onRequest, setOnRequest] = useState(false)


    const navigate = useNavigate()
    const dispatch = useDispatch()


    const username = localStorage.getItem('username')

    const form = useFormik({
        initialValues: {
            username: username,
            newPassword: '',
            password: '',
            confirmNewPassword: '',
        },
        validationSchema: Yup.object({
            newPassword: Yup.string().min(8, 'new password minium 8 characters').required('new password is required').test(
                'New passwords-match',
                'New passwords must not match password',
                function (value) {
                    return value !== this.parent.password;
                }
            ),
            password: Yup.string().min(8, 'password minium 8 characters'),
            confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword', 'confirm new password not match')]).min(8, 'confirm new password minium 8 characters').required('confirm new password is required')
        }),
        onSubmit: (values) => {
            onUpdate({
                username: values.username,
                password: values.password,
                newPassword: values.newPassword,
            })
        }
    })

    const onUpdate = async (values) => {
        console.log(values)
        if (onRequest) return
        setOnRequest(true)
        const { response, err } = await accountsApi.changePassword(values)
        setOnRequest(false)
        console.log(values)

        if (err) {
            if(err.statusCode === 404) toast.error('Wrong username or password not found')
            if(err.statusCode === 400) toast.error('Information is missing or invalid')

        }
        if (response) {
            console.log(response)
            form.resetForm()
            navigate('/')
            dispatch(setUser(null))
            toast.success('Change password successfully! Please re-login ')
        }
    }


    return (
        <Box>
            <Typography sx={{
                display: 'flex',
                margin: '50px 0px 0px 40px'
            }}
                textTransform="uppercase"
                variant='h5'
                fontWeight='500'
            >Update password</Typography>
            <Box component='form' width='400px' onSubmit={form.handleSubmit}>
                <Stack spacing={2} margin='20px 0px 0px 40px'>
                    <TextField
                        type='password'
                        placeholder='password'
                        name='password'
                        fullWidth
                        value={form.values.password}
                        color='success'
                        onChange={form.handleChange}
                        error={form.touched.password && form.errors.password !== undefined}
                        helperText={form.touched.password && form.errors.password}
                    />
                    <TextField
                        type='password'
                        placeholder='new password'
                        name='newPassword'
                        fullWidth
                        value={form.values.newPassword}
                        color='success'
                        onChange={form.handleChange}
                        error={form.touched.newPassword && form.errors.newPassword !== undefined}
                        helperText={form.touched.newPassword && form.errors.newPassword}
                    />
                    <TextField
                        type='password'
                        placeholder='confirm new password'
                        name='confirmNewPassword'
                        fullWidth
                        onChange={form.handleChange}
                        value={form.values.confirmNewPassword}
                        color='success'
                        error={form.touched.confirmNewPassword && form.errors.confirmNewPassword !== undefined}
                        helperText={form.touched.confirmNewPassword && form.errors.confirmNewPassword}
                    />
                    <LoadingButton
                        type='submit'
                        variant='contained'
                        fullWidth
                        sx={{
                            backgroundColor: '#2daf1b',
                            ":hover": {
                                backgroundColor: '#2daf1b',
                                opacity: 0.8
                            }
                        }}
                        loading={onRequest}
                    >
                        Update password
                    </LoadingButton>
                </Stack>
            </Box>
        </Box>
    )
}

export default UpdatePassword