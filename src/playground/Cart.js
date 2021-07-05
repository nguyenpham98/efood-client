import { loadStripe } from "@stripe/stripe-js";
import { Button, Container, FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from './CartContext'
import CartItem from './CartItem';
import axios from 'axios';
import Suggestion from "./Suggestion";

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
    }
}));

const Cart = () => {
    const classes = useStyles()
    const {cart, setCart} = useContext(CartContext); 
    const [mode, setMode] = useState("")
    const [time, setTime] = useState("")
    const [date, setDate] = useState("")
    const [waitTime, setWaitTime] = useState(0)
    
    useEffect(()=>{
        setTime("")
        setDate("")
        setWaitTime(0)
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
    // filter time
    const availableTime = ["0:00", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "23:59"]
    const hour = new Date().getHours().toString()
    const minutes = new Date().getMinutes().toString()
    const currentTime = parseInt(hour)*60+parseInt(minutes)
    const minimumTimeString = availableTime[0].split(":")
    const mininumTime = parseInt(minimumTimeString[0]) * 60 + parseInt(minimumTimeString[1])
    const updatedTime = availableTime.filter(time => {
        time = time.split(":")
        let totalMinutes = parseInt(time[0])*60+parseInt(time[1])+waitTime
        return totalMinutes > currentTime && currentTime > mininumTime
    })
    // get current date    
    const fullDate = new Date()    
    const day = fullDate.getDate()
    const month = fullDate.getMonth()
    const year = fullDate.getFullYear()    
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
    const handleClick = () => {
        if(mode==="pickup-today" && (time==="")) return
        else if(mode==="pickup-later" && (time==="" || date==="")) return
        else if(mode==="delivery-later" && (time==="" || date==="")) return
        handleCheckout()
    }

    const handleCheckout = async () => {
        const stripe = await stripePromise;        
        let order = [];        
        if (cart) {
            Object.keys(cart).forEach(key => {
                order.push({ price: cart[key].item.id, quantity: cart[key].quantity, tax_rates: ['txr_1IsJJvEb0hpNeLoZMFfNI8U0'] });
            })
        }    
        if(mode==="pickup-today" || mode==="pickup-later") {
            order.push({ price_data: { currency: 'USD', product_data: { name: "Pick-Up Schedule" }, unit_amount: 0 }, quantity: 1, description: mode + " | " + time + " | " + date })
            const response = await axios.post('/create-checkout-session-pickup', order);
            const result = await stripe.redirectToCheckout({
                sessionId: response.data.id,
            })
            if (result.error) console.log(result.error.message)
        }
        if(mode==="delivery-today" || mode==="delivery-later") {
            const deliveryFee = (Number(localStorage.getItem('total'))*15).toFixed(0)
            order.push({ price_data: { currency: 'USD', product_data: { name: "Delivery Fee" }, unit_amount_decimal: deliveryFee }, quantity: 1, description: mode + " | " + time + " | " + date })
            const response = await axios.post('/create-checkout-session-delivery', order);
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
                    {/* Same day pickup */}
                    {(mode === "pickup-today" && updatedTime.length>0 ) &&
                    <div>
                        <div className={classes.form}>
                            <FormControl required className={classes.formControl}>
                                <InputLabel id="demo-simple-select-required-label">Pick-Up Time</InputLabel>
                                <Select
                                    
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={time}
                                    required
                                    onChange={(e) => setTime(e.target.value)}
                                    className={classes.selectEmpty}
                                >
                                    {updatedTime.map(time=>(
                                        <MenuItem value={time} key={time}>{time}</MenuItem>
                                    ))}                            
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>                            
                        </div>
                        
                        <Button onClick={() => handleClick()} variant="contained" color="primary" style={{ marginTop: 20 }}>Checkout</Button>

                    </div>
                    }                  
                    {/* Pick-Up Later */}
                    {(mode === "pickup-later") && 
                        <div>
                            <div className={classes.form}>
                                <FormControl required className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-required-label">Pick-Up Date</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className={classes.selectEmpty}
                                    >
                                        <MenuItem value={Number(month + 1) + "/" + Number(day + 1) + "/" + year}>{new Date(year, month, day + 1).toLocaleDateString("en-US")}</MenuItem>
                                        <MenuItem value={Number(month + 1) + "/" + Number(day + 2) + "/" + year}>{new Date(year, month, day + 2).toLocaleDateString("en-US")}</MenuItem>
                                        <MenuItem value={Number(month + 1) + "/" + Number(day + 3) + "/" + year}>{new Date(year, month, day + 3).toLocaleDateString("en-US")}</MenuItem>
                                        <MenuItem value={Number(month + 1) + "/" + Number(day + 4) + "/" + year}>{new Date(year, month, day + 4).toLocaleDateString("en-US")}</MenuItem>
                                        <MenuItem value={Number(month + 1) + "/" + Number(day + 5) + "/" + year}>{new Date(year, month, day + 5).toLocaleDateString("en-US")}</MenuItem>
                                        <MenuItem value={Number(month + 1) + "/" + Number(day + 6) + "/" + year}>{new Date(year, month, day + 6).toLocaleDateString("en-US")}</MenuItem>
                                        <MenuItem value={Number(month + 1) + "/" + Number(day + 7) + "/" + year}>{new Date(year, month, day + 7).toLocaleDateString("en-US")}</MenuItem>
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            </div>
                            <div className={classes.form}>
                                <FormControl required className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-required-label">Pick-Up Time</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={time}
                                        required
                                        onChange={(e) => setTime(e.target.value)}
                                        className={classes.selectEmpty}
                                    >
                                        {availableTime.map(time => (
                                            <MenuItem value={time} key={time}>{time}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            </div>                            
                        <Button onClick={() => handleClick()} variant="contained" color="primary" style={{ marginTop: 20 }}>Checkout</Button>
                        </div>
                    }                    
                    {/* Same day delivery, small order */}                
                    {(mode === "delivery-today" && updatedTime.length > 0 && Number(localStorage.getItem("total")) <= 100) &&
                        <div>
                            <Typography>Wait time is approximately {waitTime} minutes. Please provide your delivery address at Checkout.</Typography>
                        <Button onClick={() => handleClick()} variant="contained" color="primary" style={{ marginTop: 20 }}>Checkout</Button>
                        </div>                      
                    }
                    {/* Delivery later, small order */}
                    {(mode === "delivery-later") && 
                        <div>                            
                            <div className={classes.form}>
                                <FormControl required className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-required-label">Delivery Date</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className={classes.selectEmpty}
                                    >
                                        <MenuItem value={Number(month + 1) + "/" + Number(day + 1) + "/" + year}>{new Date(year, month, day + 1).toLocaleDateString("en-US")}</MenuItem>
                                        <MenuItem value={Number(month + 1) + "/" + Number(day + 2) + "/" + year}>{new Date(year, month, day + 2).toLocaleDateString("en-US")}</MenuItem>
                                        <MenuItem value={Number(month + 1) + "/" + Number(day + 3) + "/" + year}>{new Date(year, month, day + 3).toLocaleDateString("en-US")}</MenuItem>
                                        <MenuItem value={Number(month + 1) + "/" + Number(day + 4) + "/" + year}>{new Date(year, month, day + 4).toLocaleDateString("en-US")}</MenuItem>
                                        <MenuItem value={Number(month + 1) + "/" + Number(day + 5) + "/" + year}>{new Date(year, month, day + 5).toLocaleDateString("en-US")}</MenuItem>
                                        <MenuItem value={Number(month + 1) + "/" + Number(day + 6) + "/" + year}>{new Date(year, month, day + 6).toLocaleDateString("en-US")}</MenuItem>
                                        <MenuItem value={Number(month + 1) + "/" + Number(day + 7) + "/" + year}>{new Date(year, month, day + 7).toLocaleDateString("en-US")}</MenuItem>
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            </div>
                            <div className={classes.form}>
                                <FormControl required className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-required-label">Delivery Time</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className={classes.selectEmpty}
                                    >
                                        {availableTime.map(time => (
                                            <MenuItem value={time} key={time}>{time}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            </div>
                        <Button onClick={() => handleClick()} variant="contained" color="primary" style={{ marginTop: 20 }}>Checkout</Button>
                        </div>
                    }             
                    {(mode === "delivery-today" && Number(localStorage.getItem("total")) > 100) &&
                        <Typography>We can only offer same-day delivery for order less than $100 right now.</Typography>
                    }
                    {((mode==="pickup-today" || mode==="delivery-today") && updatedTime.length === 0) && 
                        <Typography>We are closed at the moment. Please schedule a pickup/delivery for later.</Typography>
                    }
                    
                </div>
                }               
                
            </Container>
        </div>
    )
}

export default Cart
