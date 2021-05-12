import { Container, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import CategoryCard from './CategoryCard';
import Burgers from '../img/Food/burgers.jpg'
import Fries from '../img/Food/fries.jpg'
import Chickens from '../img/Food/chickens.jpg'
import Beverages from '../img/Drinks/beverages.png'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme)=> ({
    root:{
        flexGrow: 1,
        paddingBottom:'10px'
    },
    
}))
// /menu
const Menu = () => {
    const classes = useStyles();
    const history = useHistory();
    const handleClick= (category) => {
        history.push(`/menu/${category}`)
    }
    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <CategoryCard image={Burgers} title="Burgers" handleClick={handleClick} category="burgers"/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <CategoryCard image={Fries} title="Fries" handleClick={handleClick} category="fries"/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <CategoryCard image={Chickens} title="Chickens" handleClick={handleClick} category="chickens"/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <CategoryCard image={Beverages} title="Beverages" handleClick={handleClick} category="beverages"/>
                </Grid>
                
            </Grid>

        </Container>
    )
}

export default Menu
