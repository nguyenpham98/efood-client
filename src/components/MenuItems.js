
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useFetch from './useFetch'
import MenuItemsCard from './MenuItemsCard'
import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Background from '../img/background.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,        
        backgroundImage: `url(${Background})`,        
        minHeight: '100vh'
    },
    banner: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#E6291C',
        height: '100px',
        marginBottom: '10px',
    },
    bannerText: {
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    btn: {
        color: '#FFFFFF',
        fontWeight: 900,
        fontSize:'10px'
    }
}))
// menu/category
const MenuItems = () => {
    const {category} = useParams()
    let url
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
       url = 'http://localhost:5000'
    } else {
        url = 'https://react-express-heroku-nguyen.herokuapp.com'
    }
    const { data: items, isLoading, error } = useFetch(`${url}/api/${category}`);
    const classes = useStyles()
    const history = useHistory()
    const handleClick = (category,id) => {
        history.push(`/menu/${category}/${id}`)
    }
    return (
        <div className={classes.root}>
            <div className={classes.banner}>
                <Button size="small" className={classes.btn} onClick={() => history.push('/menu')}><ArrowBackIosOutlinedIcon />Menu</Button>
                <Typography variant="h4" className={classes.bannerText}>Menu Items</Typography><br/>
            </div><br/>
            <Container>
                {isLoading && <p>Loading...</p>}
                {error && <p>Something wrong</p>}
                <Grid container spacing={3}>
                    {items && items.map(item=> (
                        <Grid item xs={12} md={4} key={item.id}>
                            <MenuItemsCard item={item} handleClick={handleClick}></MenuItemsCard>
                        </Grid>
                    ))}
                </Grid>

            </Container>
        </div>
        
    )
}

export default MenuItems
