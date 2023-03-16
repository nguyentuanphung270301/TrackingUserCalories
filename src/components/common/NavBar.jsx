import { Box, Button, Grid, Stack, Typography, useScrollTrigger } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import RamenDiningOutlinedIcon from '@mui/icons-material/RamenDiningOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';





const NavBar = () => {

    const user = useSelector((state) => state.user.user)

    const dispatch = useDispatch()



    return (
        <Box sx={{
            height: 'calc(100%-100px)',
            position: 'fixed',
            borderRadius: '5px',
            backgroundColor: '#d2d2d2',
            width: '60px',
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
            zIndex: 100,
            ":hover": {
                width: '200px',
                transform: 'scale(1.0)'
            },
        }}
        >
            <Box sx={{
                height: '100px',
                width: '200px',
                backgroundColor: '#353535',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
                overflow: 'hidden',
            }}>
                <Typography sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    verticalAlign: 'center',
                    marginTop: '25px',
                    marginRight: '5px',
                    color: 'white',
                    fontFamily: 'Roboto',
                    fontWeight: '500'
                }}><img src={require('../../images/calories-calculator.png')} alt='Ảnh' style={{
                    width: '50px',
                    height: '50px', display: 'flex', marginLeft: '9px'
                }} />CALORIES COUNTER</Typography>

            </Box>



            <Box sx={{
                width: '200px',
                height: '40px',
                borderRadius: '5px',
                marginTop: '50px',
                marginBottom: '32px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                verticalAlign: 'center',
                textDecoration: "none", color: "inherit",
                cursor: 'pointer',
                ":hover": {
                    backgroundColor: '#2daf1b',
                    color: 'white'
                }
            }}
                component={Link}
                to='/'
            >
                <HomeOutlinedIcon sx={{
                    margin: '0px 15px',
                    width: '32px',
                    height: '32px',
                }} />
                <Typography variant='h6' fontWeight='400'>Home</Typography>
            </Box>

            <Box sx={{
                width: '200px',
                height: '40px',
                borderRadius: '5px',
                marginTop: '50px',
                marginBottom: '32px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                verticalAlign: 'center',
                cursor: 'pointer',
                textDecoration: "none", color: "inherit",
                ":hover": {
                    backgroundColor: '#2daf1b',
                    color: 'white'
                }
            }}
                component={Link}
                to='/categories'
            >
                <RamenDiningOutlinedIcon sx={{
                    margin: '0px 15px',
                    width: '32px',
                    height: '32px',
                }} />
                <Typography variant='h6' fontWeight='400'>Foods</Typography>
            </Box>

            <Box sx={{
                width: '200px',
                height: '40px',
                borderRadius: '5px',
                marginTop: '50px',
                marginBottom: '32px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                verticalAlign: 'center',
                cursor: 'pointer',
                ":hover": {
                    backgroundColor: '#2daf1b',
                    color: 'white'
                }
            }}
            >
                <AddCircleOutlineOutlinedIcon sx={{
                    margin: '0px 15px',
                    width: '32px',
                    height: '32px',
                }} />
                <Typography variant='h6' fontWeight='400'>Add tracking</Typography>
            </Box>

            <Box sx={{
                width: '200px',
                height: '40px',
                borderRadius: '5px',
                marginTop: '50px',
                marginBottom: '32px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                verticalAlign: 'center',
                cursor: 'pointer',
                textDecoration: "none", color: "inherit",
                ":hover": {
                    backgroundColor: '#2daf1b',
                    color: 'white'
                }
            }}
                component={Link}
                to='/search'
            >
                <SearchOutlinedIcon sx={{
                    margin: '0px 15px',
                    width: '32px',
                    height: '32px',
                }} />
                <Typography variant='h6' fontWeight='400'>Search</Typography>
            </Box>

            <Box sx={{
                width: '200px',
                height: '40px',
                borderRadius: '5px',
                marginTop: '200px',
                marginBottom: '44px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                verticalAlign: 'center',
                cursor: 'pointer',
            }} >
                {!user && <Box variant='contained'
                    sx={{
                        width: '200px',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        borderRadius: '5px',
                        alignItems: 'center',
                        marginTop: '20px',
                        verticalAlign: 'center',
                        cursor: 'pointer',
                        ":hover": {
                            backgroundColor: '#2daf1b',
                            color: 'white'
                        }
                    }}
                    onClick={() => dispatch(setAuthModalOpen(true))}>
                    <AccountCircleIcon sx={{
                        margin: '0px 10px',
                        width: '48px',
                        height: '48px',
                    }} />
                    <Typography
                        variant='h6'
                        fontWeight='400'
                        fontSize='14px'
                        sx={{
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}
                    >
                        Login
                    </Typography>
                </Box>}
                {user && <UserMenu />}
            </Box>
        </Box>
    )
}

export default NavBar