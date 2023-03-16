import React, { useEffect } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../../redux/features/userSlice'
import { ListItemButton, ListItemText, Menu, Typography } from "@mui/material";
import accountsApi from "../../api/modules/accounts.api";
import { routesGen } from "../../routes/routes";


const UserMenu = () => {
    const user = useSelector((state) => state.user.user)

    const username = localStorage.getItem('username')

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
    }, [username])
    return (
        <>
            {user && (
                <>
                    <img src={require('../../images/sontung.jpg')} alt="Ảnh" style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%'
                    }} />
                    <Typography
                        variant='h6' fontWeight='400' fontSize='14px'
                        sx={{ cursor: 'pointer', userSelect: 'none', marginLeft: '20px' }}
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
                        <ListItemButton>
                            <ListItemButton><PersonOutlineOutlinedIcon /></ListItemButton>
                            <ListItemText disableTypography primary={
                                <Typography variant="h7">Profile</Typography>
                            }
                            ></ListItemText>
                        </ListItemButton>

                        {account && account.role === 'ROLE_ADMIN' && <ListItemButton>
                            <ListItemButton><AdminPanelSettingsOutlinedIcon /></ListItemButton>
                            <ListItemText disableTypography primary={
                                <Typography variant="h7">Admin</Typography>
                            }
                            ></ListItemText>
                        </ListItemButton>}

                        <Link to={routesGen.userFavorites(username)} style={{textDecoration:'none',color:'inherit'}}>
                            <ListItemButton>
                                <ListItemButton><FavoriteBorderOutlinedIcon /></ListItemButton>
                                <ListItemText disableTypography primary={
                                    <Typography variant="h7">Favorite</Typography>
                                }
                                ></ListItemText>
                            </ListItemButton>
                        </Link>

                        <ListItemButton
                            sx={{ borderRadius: '10px' }}
                            onClick={() => dispatch(setUser(null))}
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