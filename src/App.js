import { createMuiTheme, makeStyles, ThemeProvider, responsiveFontSizes } from '@material-ui/core';
import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { CartContext } from './components/CartContext';
import About from './components/About';
import Cart from './components/Cart';
import Home from './components/Home';
import Menu from './components/Menu';
import MenuItem from './components/MenuItem';
import MenuItems from './components/MenuItems';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Success from './components/Success';
import NotFound from './components/NotFound'
import Login from './components/entry/Login';
import Signup from './components/entry/Signup';

let theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
theme = responsiveFontSizes(theme)


const useStyles = makeStyles(theme=>({
  content: {
    minHeight: '100vh'
  }
}))

function App() {  
  const savedCart = JSON.parse(localStorage.getItem('cart'));
  const [cart, setCart] = useState(savedCart || []);
  const classes = useStyles()
  
  return (
    <ThemeProvider theme={theme} >
      <CartContext.Provider value={{cart, setCart}}>        
          <Router>
            <Navbar></Navbar>
            <div className={classes.content}>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/menu/:category/:id" component={MenuItem}/>
                <Route path="/menu/:category"  component={MenuItems}/>
                <Route path="/menu/" component={Menu}/>
                <Route path="/about"  component={About}/>
                <Route path="/cart" component={Cart }/>
                <Route path="/success" component={Success}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route component={NotFound}/>                           
              </Switch>
          </div>
            <Footer ></Footer>
          </Router>        
      </CartContext.Provider>
    </ThemeProvider>
  );
}

export default App;
