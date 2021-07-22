import { createMuiTheme, makeStyles, ThemeProvider, responsiveFontSizes } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { CartContext} from './components/CartContext';
import {UserContext} from './components/UserContext'
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
import OrderHistory from './components/OrderHistory';
import axios from 'axios'
import ForgotPassword from './components/entry/ForgotPassword';
import ResetPassword from './components/entry/ResetPassword';

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
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [orderHistory, setOrderHistory] = useState([])
  const classes = useStyles()
  let url
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = 'http://localhost:5000'
  } else {
    url = 'https://react-express-heroku-nguyen.herokuapp.com'
  }
  useEffect(() => {
    axios.get(`${url}/user`, { withCredentials: true })
      .then(response => {
        setFirstName(response.data.firstName)
        setEmail(response.data.email)
        setOrderHistory(response.data.orderHistory)
      })
      .catch(err => console.log(err))
  })
  
  return (
    <ThemeProvider theme={theme} >
      <UserContext.Provider value={{firstName, setFirstName, email, setEmail, orderHistory, setOrderHistory}}>
        <CartContext.Provider value={{cart, setCart}}>        
            <Router>
              <Navbar></Navbar>
              <div className={classes.content}>
                {!firstName ?
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/menu/:category/:id" component={MenuItem}/>
                  <Route path="/menu/:category"  component={MenuItems}/>
                  <Route path="/menu/" component={Menu}/>
                  <Route path="/about"  component={About}/>
                  <Route path="/cart" component={Cart }/>
                  <Route path="/login" component={Login}/>
                  <Route path="/signup" component={Signup}/>
                  <Route path="/forgot-password" component={ForgotPassword}/>
                  <Route path="/reset-password/:id/:token" component={ResetPassword}/>
                  <Route component={NotFound}/>                           
                </Switch>
                :
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/menu/:category/:id" component={MenuItem} />
                  <Route path="/menu/:category" component={MenuItems} />
                  <Route path="/menu/" component={Menu} />
                  <Route path="/about" component={About} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/success" component={Success} />
                  <Route path="/order-history" component={OrderHistory} />
                  <Route component={NotFound} />
                </Switch>
              }
            </div>
              <Footer/>
            </Router>        
        </CartContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
