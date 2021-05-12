import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import { useParams } from 'react-router-dom'
import MenuItemCard from './MenuItemCard';
import useFetch from './useFetch';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: '10px'
    },
}))
// menu/category/id
const MenuItem = () => {
    const {category, id} = useParams();
    const classes = useStyles();
    
    const { data: items } = useFetch(`https://react-express-heroku-nguyen.herokuapp.com/api/${category}/${id}`)
    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                {items.map(item => (
                    <Grid item xs={12} md={4} key={item.id}>
                       <MenuItemCard item={item}  />
                    </Grid>
                ))}
            </Grid>

        </Container>
    )
}

export default MenuItem
