import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import MenuItemCard from './MenuItemCard';
import useFetch from './useFetch';
import {useHistory} from 'react-router-dom'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { Alert, AlertTitle } from '@material-ui/lab';
import Background from '../img/background.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundImage: `url(${Background})`,        
        minHeight: '100vh',
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
    },
    alert: {
        margin: 'auto',
        width: '70%',
        [theme.breakpoints.down("sm")]: {
            width: '90%'
        }
    }
}))
// menu/category/id
const MenuItem = () => {
    const {category, id} = useParams();
    const classes = useStyles();
    const history = useHistory()
    const { data: items, isLoading, error } = useFetch(`https://react-express-heroku-nguyen.herokuapp.com/api/${category}/${id}`)
    //const { data: items, isLoading, error } = useFetch(`/api/${category}/${id}`)
    const [msg, setMsg] = useState("")
    const handleCallback = (data) => {
        setMsg(data)
    }
    return (
        <div className={classes.root}>
            <div className={classes.banner}>
                <Button size="small" className={classes.btn} onClick={() => history.push('/menu')}><ArrowBackIosOutlinedIcon />Menu</Button>
                <Typography variant="h4" className={classes.bannerText}>Available Options</Typography><br/>
            </div>
            {msg && setTimeout(()=>setMsg(""),3000) &&
                <Alert severity="success" className={classes.alert}>
                    <AlertTitle>Success</AlertTitle>
                    {msg}
                </Alert>
            }
            <br/>            
            <Container>
                {isLoading && <p>Loading...</p>}
                {error && <p>Something wrong</p>}               
                    <Grid container spacing={3}>
                        {items && items.map(item => (
                            <Grid item xs={12} md={4} key={item.id}>
                                <MenuItemCard item={item} parentCallback={handleCallback}/>
                            </Grid>
                        ))}
                    </Grid>
            </Container>

        </div>
        
    )
}

export default MenuItem
