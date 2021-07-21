import { loadStripe } from "@stripe/stripe-js";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useContext, useEffect, useState, Fragment } from 'react'
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { CartContext } from './CartContext'
import CartItem from './CartItem';
import axios from 'axios';
import Suggestion from "./Suggestion";
import {availableTime} from './constants/availableTime'
import { unavailableDate } from "./constants/unavailableDate";
import { UserContext } from "./UserContext";
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    title:{
        fontWeight:'300',
        margin: '20px 0'
    },
    banner: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#E6291C',
        height: '100px',
        marginBottom: '10px',

    },
    bannerText: {
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    form:{
        margin: '10px 0'
    },
    btn:{
        margin:'10px 5px'
    },
    alert: {        
        width: '70%',
        [theme.breakpoints.down("sm")]: {
            width: '90%'
        }
    }
}));

const Cart = () => {
    const classes = useStyles()
    const history = useHistory()
    const {cart, setCart} = useContext(CartContext); 
    const user = useContext(UserContext)
    const [mode, setMode] = useState("")
    const [time, setTime] = useState(new Date())
    const [date, setDate] = useState(new Date())
    const [waitTime, setWaitTime] = useState(0)
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)
    useEffect(()=>{
        setTime(new Date())
        setDate(new Date())
        setWaitTime(0)
        setMessage("")
        if(Number(localStorage.getItem('total'))<=100){
            if(mode==="pickup-today") setWaitTime(30)
            if(mode==="delivery-today") setWaitTime(90)
            if(mode==="pickup-later") setWaitTime(0)
            if(mode==="delivery-later") setWaitTime(0)
        }
        if (Number(localStorage.getItem('total')) > 100) {
            if (mode === "pickup-today") setWaitTime(120)
            if (mode === "delivery-today") setWaitTime(90)
            if (mode === "pickup-later") setWaitTime(0)
            if (mode === "delivery-later") setWaitTime(0)            
        }
    }, [mode])
    
    
    const [load, setLoad] = useState(false);
    const stripePromise = loadStripe('pk_test_51Iit4KEb0hpNeLoZpBlaQsALUEXGJKeyAwYrXYiLkjzOsrrygDs8iJx3MHHgCVg7g8CD8TTXTdPA4zHaKUHVYI8t00FwaeivM9');
    const handleChange = (item, count, oldCount) => {
        // update localStorage cart quantity
        const updateQuantity = async () => {
            const itemIndex = cart.findIndex(cartItem => cartItem.item.id === item.item.id);
            let currentCart = cart;
            if (count === 0) {
                currentCart.splice(itemIndex, 1);
            }
            else currentCart[itemIndex].quantity = count;
            await setCart(currentCart);
            setLoad(!load)
        }
        updateQuantity();
        localStorage.setItem('cart', JSON.stringify(cart));        
        localStorage.setItem('total', (Number(localStorage.getItem('total'))+(count-oldCount)*item.item.unit_amount/100).toFixed(2) )
    }
    // check if selected time + waitTime in available time range
    const validTime = (t) => {
        if (t==="") return false
        let openTime = availableTime[0] * 60,
            closingTime = availableTime[availableTime.length-1] * 60,
            time = t.getHours() * 60 + t.getMinutes() + waitTime        
        if (openTime <= time && time <= closingTime ) return true
        return false
    }
    // check unavailable dates such as holiday. 
    const validDate = (d) => {
        if (d==="") return false
        let day = d.getDate().toString(),
            month = (d.getMonth()+1).toString()
        if (parseInt(day) < 10) day = "0" + day
        if (parseInt(month) < 10) month = "0" + month
        return !unavailableDate.includes(month + "/" + day)
    }
    // check if today is unavailable
    const isTodayOff = () => {
        let day = new Date().getDate().toString(),
            month = (new Date().getMonth()+1).toString()
        if (parseInt(day) < 10) day = "0" + day
        if (parseInt(month) < 10) month = "0" + month    
        return unavailableDate.includes(month + "/" + day)
    }
    // check logged in or not
    const isLoggedIn = () => {
        return user.firstName ? true : false
    }

    // check if data provided is legit. if true, go to Stripe
    const handleClick = () => {
        if (!isLoggedIn()) history.push('/login')
        
        else {
            // pickup-today allowed if ordered time is valid and today is not off
            if (mode === "pickup-today") {
                if (!validTime(time)) {
                    setMessage("Sorry, We Would Be Closed By Then. Please Choose A Different Time.")
                    return
                }
                else if (isTodayOff()) {
                    setMessage("Sorry, We Are Taking Today Off. Please Come Back When We Are Open Again.")
                    return
                }
            }
            // pickup-later and delivery-later allowed if ordered time is valid and date is not off
            else if (mode === "pickup-later") {
                if (!validTime(time)) {
                    setMessage("Sorry, We Would Be Closed By Then. Please Choose A Different Time.")
                    return
                }
                else if (!validDate(date)) {
                    setMessage("Sorry, We Are Not Open For That Date. Please Choose A Different Date.")
                    return
                }
            }
            else if (mode === "delivery-later") {
                if (!validTime(time)) {
                    setMessage("Sorry, We Would Be Closed By Then. Please Choose A Different Time.")
                    return
                }
                else if (!validDate(date)) {
                    setMessage("Sorry, We Are Not Open For That Date. Please Choose A Different Date.")
                    return
                }
            }
            handleCheckout()
        }

        
    }

    const handleCheckout = async () => {
        const stripe = await stripePromise;        
        let order = [];        
        if (cart) {
            Object.keys(cart).forEach(key => {
                order.push({ price: cart[key].item.id, quantity: cart[key].quantity, tax_rates: ['txr_1IsJJvEb0hpNeLoZMFfNI8U0'] });
            })
        }    
        // clear local cart
        localStorage.removeItem('cart')
        localStorage.removeItem('total')
        setCart([])
        // route depends on shipping method
        if(mode==="pickup-today" || mode==="pickup-later") {
            order.push({ price_data: { currency: 'USD', product_data: { name: "Pick-Up Schedule" }, unit_amount: 0 }, quantity: 1, description: mode + " | " + time.toLocaleTimeString() + " | " + date.toLocaleDateString('en-US') })
            const response = await axios.post('/create-checkout-session-pickup', {order:order, email: user.email});
            const result = await stripe.redirectToCheckout({
                sessionId: response.data.id,
            })
            if (result.error) console.log(result.error.message)
        }
        if(mode==="delivery-today" || mode==="delivery-later") {
            const deliveryFee = (Number(localStorage.getItem('total'))*15).toFixed(0)
            order.push({ price_data: { currency: 'USD', product_data: { name: "Delivery Fee" }, unit_amount_decimal: deliveryFee }, quantity: 1, description: mode + " | " + time.toLocaleTimeString() + " | " + date.toLocaleDateString('en-US') })
            const response = await axios.post('/create-checkout-session-delivery', { order: order, email: user.email });
            const result = await stripe.redirectToCheckout({
                sessionId: response.data.id,
            })            
            if (result.error) console.log(result.error.message)
                 
        }      
        //const response = await axios.post('https://react-express-heroku-nguyen.herokuapp.com/create-checkout-session', order);
    }
    return (
        <div>
            <div className={classes.banner}>
                <Typography variant="h4" className={classes.bannerText}>Your Orders</Typography>
            </div> 
            {(JSON.parse(localStorage.getItem("cart")) == null || JSON.parse(localStorage.getItem("cart")).length === 0) && <Suggestion/>}
            <Container>                
                <Grid container spacing={3}>
                    {(JSON.parse(localStorage.getItem("cart")) != null && JSON.parse(localStorage.getItem("cart")).length>0 ) && JSON.parse(localStorage.getItem("cart")).map(item => (
                        <Grid item xs={12} md={4} key={item.item.id}>
                            <CartItem item={item} handleChange={handleChange}></CartItem>
                        </Grid>
                    ))}
                </Grid>                
                {(JSON.parse(localStorage.getItem("cart")) != null && JSON.parse(localStorage.getItem("cart")).length > 0) &&
                <div>
                    
                    <Typography style={{ display: 'inline-block' }}>Subtotal&nbsp; </Typography><Typography variant="h6" style={{ display: 'inline-block' }} > ${Number(localStorage.getItem('total')).toFixed(2)}</Typography>
                    {/* Choosing shipping modes */}
                    <div className={classes.form}>
                        <FormControl required className={classes.formControl}>
                            <InputLabel id="demo-simple-select-required-label">Shipping Method</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                                className={classes.selectEmpty}
                            >                               
                                <MenuItem value="pickup-today" >Same-Day Pickup </MenuItem>
                                <MenuItem value="pickup-later" >Pickup Later</MenuItem>                              
                                {/* <MenuItem value="delivery-today" >Same-Day Delivery</MenuItem>
                                <MenuItem value="delivery-later">Delivery Later</MenuItem>                              */}
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                    </div>                    
                </div>        
            }
            {(mode==="pickup-today") && 
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Fragment>                            
                            <TimePicker
                                variant="inline"
                                label="Time"
                                value={time}
                                onChange={setTime}
                            />
                        </Fragment>
                    </MuiPickersUtilsProvider>
                    <br /><br/>
                    {message &&
                        <Alert severity="error" className={classes.alert}>
                            <AlertTitle>Oops...</AlertTitle>
                            {message}
                        </Alert>
                    }
                    <Button onClick={() => setOpen(true)} variant="contained" color="primary" className={classes.btn}>Checkout</Button>
                </div>
            }
            {(mode==="pickup-later") && 
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Fragment>
                            <DatePicker
                                variant="inline"
                                label="Date"
                                value={date}
                                onChange={setDate}
                            />
                            <TimePicker
                                variant="inline"
                                label="Time"
                                value={time}
                                onChange={setTime}
                            />
                        </Fragment>
                    </MuiPickersUtilsProvider>
                    <br /><br/>
                    {message &&
                        <Alert severity="error" className={classes.alert}>
                            <AlertTitle>Oops...</AlertTitle>
                            {message}
                        </Alert>
                    }
                    <Button onClick={() => setOpen(true)} variant="contained" color="primary" className={classes.btn}>Checkout</Button>
                </div>
            }
            </Container>
            <Dialog
                open={open}
                onClose={() => setOpen(false) }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Make sure you have everything you need in your cart. Once you hit agree, there is no going back.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => {setOpen(false); handleClick()}} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Cart
