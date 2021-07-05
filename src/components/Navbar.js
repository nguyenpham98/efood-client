import React, {useState} from 'react'
import {AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Avatar, Box} from '@material-ui/core'
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import Logo from '../img/logo.jpg'

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: '#fff176',
        height: '100px',
        padding: '10px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: "black"
    },
    
    list: {
        width:250,
    },
    listItem: {
        margin: '20px 0 15px 0'
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
                        <ShoppingCartOutlinedIcon fontSize="large" color="primary"/>
                    </Button>                                  
                </Toolbar>            
            </AppBar>
            <Drawer anchor='left' open={isDrawerOpened} onClose={toggleDrawer} >
                <List className={classes.list}>
                    <ListItem button component={Link} to="/login" onClick={toggleDrawer}>
                        <ListItemIcon><AccountCircleOutlinedIcon color="primary" fontSize="large" className={classes.listItem}/></ListItemIcon>
                        <ListItemText>LOGIN</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/signup" onClick={toggleDrawer}>
                        <ListItemIcon><AddBoxOutlinedIcon color="primary" fontSize="large" className={classes.listItem}/></ListItemIcon>
                        <ListItemText>SIGN UP</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/" onClick={toggleDrawer}>
                        <ListItemIcon><HomeOutlinedIcon color="primary" fontSize="large" className={classes.listItem}/></ListItemIcon>
                        <ListItemText>HOME</ListItemText>
                    </ListItem>                    
                    <ListItem button component={Link} to="/menu" onClick={toggleDrawer}>
                        <ListItemIcon><FastfoodOutlinedIcon color="primary" fontSize="large" className={classes.listItem}/></ListItemIcon>
                        <ListItemText>MENU</ListItemText>                
                    </ListItem>                
                    <ListItem button component={Link} to="/about" onClick={toggleDrawer}>
                        <ListItemIcon><InfoOutlinedIcon color="primary" fontSize="large" className={classes.listItem}/></ListItemIcon>
                        <ListItemText>ABOUT US</ListItemText>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}

export default Navbar
