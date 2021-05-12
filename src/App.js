import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';
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

const theme = createMuiTheme({

})



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
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/menu/:category/:id">
                <MenuItem />
              </Route>
              <Route path="/menu/:category">
                <MenuItems />
              </Route>            
              <Route path="/menu">
                <Menu/>
              </Route>         
              <Route path="/about">
                <About />
              </Route>        
              <Route path="/cart">
                <Cart/>
              </Route>
              <Route path="/success">
                <Success />
              </Route>
              
            </Switch>
          </div>
            <Footer ></Footer>
          </Router>
        
      </CartContext.Provider>
    </ThemeProvider>
  );
}

export default App;
