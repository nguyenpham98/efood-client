import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import ComputerOutlinedIcon from '@material-ui/icons/ComputerOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';

const useStyles = makeStyles(theme=>({
    container: {
        display:'flex',
        justifyContent:'center',
        textAlign:'center',
        backgroundColor: '#ffd699',
        padding: '130px 0',
        //color: '#000000',
        height: '400px',
        [theme.breakpoints.down("sm")]: {
            height: '800px',
            padding: '100px 40px'
        }

    }
}))

export const Bonus = () => {
    const classes = useStyles()
    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} md={3}>
                <CallOutlinedIcon/>
                <Typography variant="h6">Easy Phone Order</Typography>
                <Typography>Call us through XXX-YYY-ZZZZ. We have a highly-trained crew for taking phone orders.</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                <ComputerOutlinedIcon/>
                <Typography variant="h6">...Or Order Online</Typography>
                <Typography>Spare the conversations. Make an order online and we'll happily deliver to you at your best comfort.</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                <ContactSupportOutlinedIcon/>
                <Typography variant="h6">Awesome Support</Typography>
                <Typography>Not sure what to get? We would love to provide you with the awesome suggestions that work best in your favor.</Typography>
            </Grid>
        </Grid>
    )
}

export default Bonus
