import { Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import CategoryCard from './CategoryCard';
import Stock from '../img/stock_menu.jpg'
import { useHistory } from 'react-router-dom';
import Background from '../img/background.jpg'

const useStyles = makeStyles((theme)=> ({
    root:{
        flexGrow: 1,
        paddingBottom:'10px',
        backgroundImage: `url(${Background})`,
        minHeight: '100vh'
    },
    banner:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",                
        backgroundColor: '#E6291C',
        height:'100px',
        marginBottom:'10px',    
        
    },
    bannerText:{
        fontWeight: 'bold',
        color: '#FFFFFF',        
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
        <div className={classes.root} >
            <div className={classes.banner}>   
                <Typography variant="h4" className={classes.bannerText}>Let's Get It Started</Typography>
            </div><br/>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <CategoryCard image={Stock} title="Banh Mi" handleClick={handleClick} category="banhmi"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CategoryCard image={Stock} title="Sweets" handleClick={handleClick} category="sweets"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CategoryCard image={Stock} title="Coffee" handleClick={handleClick} category="coffee"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CategoryCard image={Stock} title="Boba" handleClick={handleClick} category="boba"/>
                    </Grid>
                    
                    
                </Grid>
            </Container>

        </div>
    )
}

export default Menu
