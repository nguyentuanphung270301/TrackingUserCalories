import { Box, Grid, Typography } from '@mui/material'
import { Link } from "react-router-dom";
import { routesGen } from "../../routes/routes";




const CategoryItem = ({ category, request }) => {

    return (
        <>
            {category && category.map((item, index) => (
                <Grid item key={index} xs={2} sm={4} md={2} width='235px'
                    sx={{
                        margin: '10px 0px 0px 50px',
                        marginTop: '10!important',
                        paddingLeft: '0!important',
                        paddingTop: '0!important',
                    }}>
                    <Link to={routesGen.foodByCategory(item.name, item.id)}>
                        <Box
                            sx={{
                                bgcolor: '#f5f5f5',
                                p: 2, height: '270px',
                                width: '230px!important',
                                position: 'relative',
                                transition: 'opacity 0.3s ease',
                                cursor: 'pointer',
                                borderRadius: '10px',
                                ":hover": {
                                    opacity: '0.8',
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                }
                            }}
                        >
                            <img src={item.image} alt='Ảnh' style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                top: 0,
                                left: 0,
                                padding: 0,
                                borderRadius: '10px',
                                overflow: 'hidden',
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                            }} />
                            <Typography
                                variant='h7'
                                color='white'
                                fontSize='18px'
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    marginBottom: '20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontWeight: '500'
                                }}>{item.name}
                            </Typography>
                        </Box>
                    </Link>
                </Grid>
            ))}
        </>
    )
}

export default CategoryItem