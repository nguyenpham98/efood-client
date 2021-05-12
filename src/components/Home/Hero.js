import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import hero from '../../img/Home/hero.jpg'
import React from 'react'

const useStyles = makeStyles((theme)=>({
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
        marginTop:'-20px',        
        textAlign: 'center',
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em",            
        }
    },
}))

const Hero = () => {
    const classes = useStyles();
    return (
        <Box className={classes.hero}>
            <Box>
                <Typography variant="h4">Selling The Best Burgers In Charlotte</Typography>
                <Typography >We focus on making fresh meals for you everyday using the freshest ingredients</Typography>
                <Button variant="contained" color="primary">Order now</Button>
            </Box>
        </Box>
    )
}

export default Hero
