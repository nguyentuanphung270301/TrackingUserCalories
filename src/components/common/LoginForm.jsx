import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import authApi from "../../api/modules/auth.api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from "@mui/lab";
import { setUser, setUsername } from "../../redux/features/userSlice";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";

const LoginForm = ({ switchAuthState }) => {
  const dispatch = useDispatch()
  const [isLoginRequest, setIsLoginRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const username = useSelector((state)=> state.user.username)

  const loginForm = useFormik(
    {
      initialValues: {
        password: "",
        username: ""
      },
      validationSchema: Yup.object({
        username: Yup.string()
          .min(0, "username cannot be empty")
          .required("username is required"),
        password: Yup.string()
          .min(0, "password cannot be empty")
          .required("password is required")
      }),
      onSubmit: async values => {
        setErrorMessage(undefined);
        setIsLoginRequest(true);
        const { response, err } = await authApi.login(values);
        setIsLoginRequest(false);

        if (response) {
          dispatch(setUsername(loginForm.values.username))
          loginForm.resetForm();
          dispatch(setUser(response));
          dispatch(setAuthModalOpen(false));
          toast.success("Login successfully");
        }
        if(err) {
          toast.error('Wrong username or password')
        }
      }
    }
  )


  const handleForgot = async () => {
    const forgotUsername = loginForm.values.username
    console.log(forgotUsername)
    const { response, err } = await authApi.forgot(forgotUsername);
    if (response) {
      loginForm.resetForm();
      toast.success(response);
    }
    if (err) toast.error(err.message)
  };
  return (
    <>
    <Box component="form" onSubmit={loginForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={loginForm.values.username}
          onChange={loginForm.handleChange}
          color="success"
          error={loginForm.touched.username && loginForm.errors.username !== undefined}
          helperText={loginForm.touched.username && loginForm.errors.username}
        />
        <TextField
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          value={loginForm.values.password}
          onChange={loginForm.handleChange}
          color="success"
          error={loginForm.touched.password && loginForm.errors.password !== undefined}
          helperText={loginForm.touched.password && loginForm.errors.password}
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{
          marginTop: 4,
          backgroundColor: '#2daf1b',
          ":hover": {
            opacity: 0.7,
            backgroundColor: '#2daf1b'
          }
        }}
        loading={isLoginRequest}
      >
        Login
      </LoadingButton>

      <Button
        fullWidth
        sx={{
          marginTop: 1,
          color: '#2daf1b',
          fontSize:'15px'
        }}
        onClick={() => switchAuthState()}
      >
        Register
      </Button>
      <Typography variant="h6" fontSize='14px' textAlign='center' sx={{
        ":hover":{
          opacity:'0.8',
          cursor:'pointer',
          textDecoration: "underline"
        }
      }} onClick={handleForgot}>Forgot Password</Typography>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
        </Box>
      )}
    </Box>
    </>
  )
}

export default LoginForm