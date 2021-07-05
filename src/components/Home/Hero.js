import hero from '../../img/Home/hero.jpg'
import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import {useHistory} from 'react-router-dom'

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
        textAlign: 'center',
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em",            
        }
    },
}))

const Hero = () => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Box className={classes.hero}>
            <Box>
                <Typography variant="h2">Welcome To 220°C</Typography>
                <Typography variant="h6">- Insert something catchy here -</Typography>                
                <Button variant="contained" color="primary" onClick={()=> history.push('/menu')}>Order now</Button>
            </Box>
        </Box>
    )
}

export default Hero
