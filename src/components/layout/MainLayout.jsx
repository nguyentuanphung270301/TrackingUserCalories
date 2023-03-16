import React, { useEffect } from 'react'
import RegisterForm from '../common/RegisterForm'
import NavBar from '../common/NavBar'
import LoginForm from '../common/LoginForm'
import GetUser from '../common/GetUser'
import AuthModal from '../common/AuthModal'
import { useDispatch, useSelector } from 'react-redux'
import userApi from '../../api/modules/user.api'
import { Box, Icon } from '@mui/material'
import GlobalLoading from '../common/GlobalLoading'
import { Outlet } from 'react-router-dom'
import { setUser } from '../../redux/features/userSlice'

const MainLayout = () => {

  const dispatch = useDispatch();

  const key = localStorage.key(0)

  useEffect(() => {
    const authUser= async() => {
      const user = localStorage.getItem(key)
      if(user) dispatch(setUser(user))
    }
    authUser()
  },[dispatch])

  

  return (
    <>
      <GlobalLoading/>

      <AuthModal/>
      <NavBar/>
      
      <Box
          component="main"
          flexGrow={1}
          marginLeft='60px'
          overflow="hidden"
          height='100%'
          width='calc(100% - 60px)'
        >
        <Outlet/>
        </Box>


    </>
  )
}

export default MainLayout