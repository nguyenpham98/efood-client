import React, {useState} from 'react'
import {AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Avatar, Box} from '@material-ui/core'
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import Logo from '../img/logo.jpg'

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: '#fff176',
        marginBottom: 20
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: "black"
    },
    
    list: {
        width:250,
    }
    
}))


const Navbar = () => {
    const classes = useStyles();
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const toggleDrawer= () => {
        setIsDrawerOpened(!isDrawerOpened)
    }   
    return (
        <div>
            <AppBar position="static" className={classes.appBar}  >
                <Toolbar >
                    <IconButton onClick={toggleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>    
                    <Box style={{ flexGrow: 1 }}>
                        <Avatar alt="logo" src={Logo} variant="rounded" component={Link} to='/' ></Avatar>
                    </Box>
                    <Button component={Link} to='/cart'>
                        <ShoppingBasketOutlinedIcon/>
                    </Button>                                  
                </Toolbar>            
            </AppBar>
            <Drawer anchor='left' open={isDrawerOpened} onClose={toggleDrawer} >
                <List className={classes.list}>
                    <ListItem button component={Link} to="/" onClick={toggleDrawer}>
                        <ListItemIcon><HomeOutlinedIcon/></ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItem>
                    <Divider/>
                    <ListItem button component={Link} to="/menu" onClick={toggleDrawer}>
                        <ListItemIcon><FastfoodOutlinedIcon /></ListItemIcon>
                        <ListItemText>Order</ListItemText>                
                    </ListItem>                
                    <ListItem button component={Link} to="/about" onClick={toggleDrawer}>
                        <ListItemIcon><InfoOutlinedIcon /></ListItemIcon>
                        <ListItemText>About</ListItemText>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}

export default Navbar
