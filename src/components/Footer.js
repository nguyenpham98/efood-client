import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Logo from '../img/logo.jpg'

const useStyles = makeStyles(theme =>({
    container: {
        padding: '40px 0px',
        color:'#FFFFFF',
        height: '150px',
        [theme.breakpoints.down('xs')]: {
            paddingRight: '50px',
            height: '200px'
            
        },
        backgroundColor: '#494449',
        
    },
    logo: {
        marginLeft: '250px',
        [theme.breakpoints.down('xs')]:{
            marginLeft:'10px'
        }
    }
}))

const Footer = () => {
    const classes = useStyles()
    return (
        
        <Grid container className={classes.container}>
            <Grid item xs={6} md={3} >
                <Avatar 
                    alt="logo"
                    src={Logo}
                    className={classes.logo}
                />
                
            </Grid>
            <Grid item xs={false} md={6}></Grid>
            <Grid item xs={6} md={3}>
                <Typography variant="h6">Have questions? Email us: something@email.com</Typography>
            </Grid>

        </Grid>
        
    )
}

export default Footer
