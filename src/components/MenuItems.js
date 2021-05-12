
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useFetch from './useFetch'
import ItemCard from './ItemCard'
import { Container, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: '10px'
    },
}))
// menu/category
const MenuItems = () => {
    const {category} = useParams()
    
    const { data: items } = useFetch(`https://react-express-heroku-nguyen.herokuapp.com/api/${category}`);
    const classes = useStyles()
    const history = useHistory()
    const handleClick = (category,id) => {
        history.push(`/menu/${category}/${id}`)
    }
    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                {items.map(item=> (
                    <Grid item xs={12} md={4} key={item.id}>
                            <ItemCard item={item} handleClick={handleClick}></ItemCard>
                    </Grid>
                ))}
            </Grid>

        </Container>
        
    )
}

export default MenuItems
