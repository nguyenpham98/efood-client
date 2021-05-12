import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
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
        marginTop: '-20px',
        textAlign: 'center',
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: '3em'
        }
    },
}))

const Success = () => {
    const classes = useStyles()
    return (
        <Box className={classes.hero}>
            <Box>
                <Typography variant="h2" gutterBottom>Thank you for your order.</Typography>
                <Typography>Check your email for the order receipt number.</Typography>
                <Button variant="contained" color="secondary">Continue shopping</Button>
            </Box>
        </Box>
    )
}

export default Success
