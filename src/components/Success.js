import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import hero from '../img/Home/hero.jpg'
import { CartContext } from './CartContext'



const useStyles = makeStyles((theme) => ({
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero})`,
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        
        textAlign: 'center',
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: '3em'
        }
    },
}))

const Success = () => {
    const classes = useStyles()
    const history = useHistory()
    const {setCart} = useContext(CartContext)
    
    
    useEffect(() => {        
        const clearAll = () => {
            localStorage.removeItem('cart')
            localStorage.removeItem('total')
            setCart([])
        }
        clearAll();
    }, [setCart])
    return (
        <Box className={classes.hero}>
            <Box>
                <Typography variant="h2" gutterBottom>Thank you for your order.</Typography>
                <Typography>Check your email for the order receipt number.</Typography>
                <Button variant="contained" color="primary" onClick={() => history.push('/menu')}>Continue Shopping</Button>
            </Box>
        </Box>
    )
}

export default Success
