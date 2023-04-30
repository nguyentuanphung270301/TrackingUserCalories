import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import AdminFoods from '../components/common/AdminFoods'
import AdminCategory from '../components/common/AdminCategory'
import AdminUser from '../components/common/AdminUser'
import AdminAccount from '../components/common/AdminAccount'

const AdminPage = () => {

    const [request, setRequest] = useState('')


    return (
        <Box position='relative'>
            <Box display='inline-block' sx={{
                position: 'fixed',
                backgroundColor: '#d2d2d2',
                width: '100%',
                height: '50px',
                display: 'flex',
                verticalAlign: 'center',
                borderRadius: '10px',
                zIndex: 1,
            }}>

                <Button sx={{
                    display: 'flex',
                    textTransform: 'unset',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0px 50px 0px 50px',
                    width: '100px',
                    textDecoration: "none", color: "inherit",
                    cursor: 'pointer',
                    borderRadius: '10px',
                    ":hover": {
                        backgroundColor: '#2daf1b',
                        color: 'white'
                    }
                }}
                    onClick={() => setRequest('account')}
                >
                    <Typography variant='h6' fontWeight='400' textAlign='center'>Account</Typography>
                </Button>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0px 50px 0px 0px',
                    width: '100px',
                    textDecoration: "none", color: "inherit",
                    cursor: 'pointer',
                    borderRadius: '10px',
                    ":hover": {
                        backgroundColor: '#2daf1b',
                        color: 'white'
                    }
                }}
                    onClick={() => setRequest('user')}
                >
                    <Typography variant='h6' fontWeight='400' textAlign='center'>User</Typography>
                </Box>

                <Button
                    variant='filled'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0px 50px 0px 0px',
                        width: '100px',
                        textDecoration: "none", color: "inherit",
                        cursor: 'pointer',
                        borderRadius: '10px',
                        textTransform: 'unset',
                        ":hover": {
                            backgroundColor: '#2daf1b',
                            color: 'white'
                        }
                    }}
                    onClick={() => setRequest('category')}
                >
                    <Typography variant='h6' fontWeight='400' textAlign='center'>Category</Typography>
                </Button>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0px 50px 0px 0px',
                    width: '100px',
                    textDecoration: "none", color: "inherit",
                    cursor: 'pointer',
                    borderRadius: '10px',
                    ":hover": {
                        backgroundColor: '#2daf1b',
                        color: 'white'
                    },
                }}
                    onClick={() => setRequest('foods')}
                >
                    <Typography variant='h6' fontWeight='400' textAlign='center'>Food</Typography>
                </Box>
            </Box>
            {request === 'category' && <AdminCategory />}
            {request === 'foods' && <AdminFoods />}
            {request === 'user' && <AdminUser />}
            {request === 'account' && <AdminAccount />}
        </Box>
    )
}

export default AdminPage