import React, { useEffect } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../../redux/features/userSlice'
import { Avatar, ListItemButton, ListItemText, Menu, Typography } from "@mui/material";
import accountsApi from "../../api/modules/accounts.api";
import { routesGen } from "../../routes/routes";
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';


const UserMenu = () => {
    const user = useSelector((state) => state.user.user)

    const username = localStorage.getItem('username')

    const navigate = useNavigate()


    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null)

    const [account, setAccount] = useState(null)


    const toggleMenu = (e) => setAnchorEl(e.currentTarget)

    useEffect(() => {
        const getAccount = async () => {
            try {
                const response = await accountsApi.getAccount(username)
                setAccount(response)
                console.log(account)
            } catch (error) {
                console.log('Failed to fetch account: ', error)
            }
        }
        getAccount()
    }, [username, navigate])


    const logOut = () => {
        dispatch(setUser(null))
        navigate('/')
    }
    return (
        <>
            {user && (
                <>
                <Avatar alt="Ảnh" src={ (account && account.user.image) ||(require('../../images/avatar.jpg'))} sx={{
                    width:'48px',
                    height:'48px',
                    marginLeft:'5px'
                }}/>
                    <Typography
                        variant='h6' fontWeight='400' fontSize='14px'
                        sx={{ cursor: 'pointer', userSelect: 'none', marginLeft: '10px' }}
                        onClick={toggleMenu}
                    >
                        {account && `${account.user.lastName} ${account.user.firstName}`}
                    </Typography>
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        PaperProps={{ sx: { padding: 0 } }}
                        sx={{
                            left: 1,
                            top: -19
                        }}
                    >
                        <Link to={routesGen.profile(username)} style={{ textDecoration: 'none', color: 'inherit' }} >
                            <ListItemButton>
                                <ListItemButton><PersonOutlineOutlinedIcon /></ListItemButton>
                                <ListItemText disableTypography primary={
                                    <Typography variant="h7">Profile</Typography>
                                }
                                ></ListItemText>
                            </ListItemButton>
                        </Link>

                        {account && account.role === 'ROLE_ADMIN' &&
                            <Link to={routesGen.admin} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemButton>
                                    <ListItemButton><AdminPanelSettingsOutlinedIcon /></ListItemButton>
                                    <ListItemText disableTypography primary={
                                        <Typography variant="h7">Admin</Typography>
                                    }
                                    ></ListItemText>
                                </ListItemButton>
                            </Link>
                        }

                        <Link to={routesGen.userFavorites(username)} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemButton><FavoriteBorderOutlinedIcon /></ListItemButton>
                                <ListItemText disableTypography primary={
                                    <Typography variant="h7">Favorite</Typography>
                                }
                                ></ListItemText>
                            </ListItemButton>
                        </Link>

                        <Link to={routesGen.updatepassword} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemButton>
                                <ListItemButton><PasswordOutlinedIcon /></ListItemButton>
                                <ListItemText disableTypography primary={
                                    <Typography variant="h7">Update password</Typography>
                                }
                                ></ListItemText>
                            </ListItemButton>
                        </Link>

                        <ListItemButton
                            sx={{ borderRadius: '10px' }}
                            onClick={logOut}
                        >
                            <ListItemButton><LogoutOutlinedIcon /></ListItemButton>
                            <ListItemText disableTypography primary={
                                <Typography variant="h7">Log out</Typography>
                            }>
                            </ListItemText>
                        </ListItemButton>
                    </Menu>
                </>
            )}
        </>
    )
}
export default UserMenu