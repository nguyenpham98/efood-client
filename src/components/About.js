import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Products from '../img/About/products.jpg'
import Goal from '../img/About/goal.png'
import Owners from '../img/About/owners.jpg'
import Hero from '../img/Home/hero.jpg'

const useStyles = makeStyles((theme) => ({
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Hero})`,
        height: "550px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        marginBottom: '10px',
        textAlign: 'center',
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em",
        }
    },
    title:{
        textAlign: 'center',
        margin:'60px'
    },
    image: {
        height: 600,
        [theme.breakpoints.down('sm')]:{
            height: 350
        }
    },
    container: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        },
        marginBottom: '20px'
    },
    content: {
        marginBottom: '20px'
    },
    gridContainer: {
        marginBottom: '100px'
    }
    
}))

const About = () => {
    const classes = useStyles()
    return (
        <div>
            <Box className={classes.hero}>
                <Box>
                    <Typography variant="h2">About 220°C</Typography>
                    <Typography variant="h6">- Insert something here - </Typography>
                </Box>
            </Box>
            <Container className={classes.container}>
                <Typography variant="h2" className={classes.title} >Our Products</Typography>                
                <Grid container className={classes.gridContainer}>                
                    <Grid item xs={12} md={3}>
                        <img src={Products} className={classes.image} alt="products"/>                        
                    </Grid>
                    <Grid item xs={false} md={4}></Grid>
                    <Grid item xs={12} md={3} >                        
                        <Typography variant="h6" className={classes.content}>Beautiful Burgers</Typography>
                        <Typography className={classes.content}>Get that first bite and really feel the ingredients: Patty, Pickle, Tomato, Cheese, Lettuce, and Awesome Sauce.</Typography>
                        <Typography variant="h6" className={classes.content}>Freaky Fries</Typography>
                        <Typography className={classes.content}>Potatos are hand-picked from the mountains, made with love, and seasoned with infamous All-Blue seasalt.</Typography>
                        <Typography variant="h6" className={classes.content}>Dope Drink</Typography>
                        <Typography className={classes.content}>We have a wide selection of drinks, from either Lite, Strong, to Casual. Ingredients are stocked weekly to make sure everything is fresh.</Typography>
                    </Grid>
                </Grid>
                <Typography variant="h2" className={classes.title}>Our Goals</Typography>
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12} md={3}  >
                        <Typography variant="h6" className={classes.content}>Quality food</Typography>
                        <Typography className={classes.content}>We thrive to the bottom of the Earth to find the secret to the best burger globally.</Typography>
                        <Typography variant="h6" className={classes.content}>A Place For Everyone</Typography>
                        <Typography className={classes.content}>We serve all customers from all background. E-Food is proud to be the middle ground of peace.</Typography>
                        <Typography variant="h6" className={classes.content}>Give back to the community</Typography>
                        <Typography className={classes.content}>We host a giveaway monthly with a prize of up to $1,000,000 Dollar.</Typography>
                    </Grid>                    
                    <Grid item xs={false} md={4}></Grid>
                    <Grid item xs={12} md={3}>
                        <img src={Goal} className={classes.image} alt="goals" />
                    </Grid>
                </Grid>
                <Typography variant="h2" className={classes.title} >Our Story</Typography>
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12} md={4}>
                        <img src={Owners} className={classes.image} alt="owners" />
                    </Grid>
                    <Grid item xs={false} md={3}></Grid>
                    <Grid item xs={12} md={4}>
                                           
                        <Typography className={classes.content}>It started in the year of 2049 when Sam McBrian and Daniel Cornell was a sophomore in college. Sam and Daniel were the best students in their departments. However, they always seem to feel that something is missing.</Typography>
                        <Typography className={classes.content}>They started many small business to find their passion. Eventually, E-Food became their final and true dreams that could change the world.</Typography>
                        <Typography className={classes.content}>Sam and Daniel aims to make sure everyone in the world can enjoy their ever-improving food.</Typography>
                        
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default About
