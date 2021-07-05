import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import EmptyCart from '../img/empty_cart.png'
import SmallEmptyCart from '../img/empty_cart_1.png'

const useStyles = makeStyles(theme => ({
    container:{        
        textAlign: "center",
        justifyContent: "center",
        margin: 'auto'
    },
    image: {
        backgroundImage: `url(${EmptyCart})`,
        height: 300,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",             
        [theme.breakpoints.down("xs")]: {            
            backgroundImage: `url(${SmallEmptyCart})`,
        }
    },
    
}))

const Suggestion = () => {
    const classes = useStyles()
    const history = useHistory()
    return (
        <Grid container>
            <Container className={classes.container}>
                <Grid item xs={12}>
                    <div className={classes.image}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>Empty Menu</Typography>
                    <Typography variant="h5" gutterBottom>Looks like you haven't made your choice yet...</Typography>
                    <Button variant="contained" color="primary" onClick={() => history.push('/menu')}>Back To Menu</Button>
                </Grid>
            </Container>
        
        </Grid>
    )
}

export default Suggestion
