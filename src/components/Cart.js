import { loadStripe } from "@stripe/stripe-js";
import { Button, Container, Grid, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { CartContext } from './CartContext'
import CartItem from './CartItem';
import axios from 'axios';
const Cart = () => {
    const {cart, setCart} = useContext(CartContext); 
    const [load, setLoad] = useState(false);
    const stripePromise = loadStripe('pk_test_51Iit4KEb0hpNeLoZpBlaQsALUEXGJKeyAwYrXYiLkjzOsrrygDs8iJx3MHHgCVg7g8CD8TTXTdPA4zHaKUHVYI8t00FwaeivM9');
    const handleChange = (item, count) => {
        // update localStorage cart quantity
        const updateQuantity = async () => {
            const itemIndex = cart.findIndex(cartItem => cartItem.item.id === item.item.id);
            let currentCart = cart;
            if (count === 0) {
                currentCart.splice(itemIndex, 1);
            }
            else currentCart[itemIndex].quantity = count;
            await setCart(currentCart);
            setLoad(!load);
        }
        updateQuantity();
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    const handleCheckout = async () => {
        const stripe = await stripePromise;
        let order = [];        
        if (cart) {
            Object.keys(cart).forEach(key => {
                order.push({ price: cart[key].item.id, quantity: cart[key].quantity });
            })
        }
        localStorage.removeItem('cart')
        setCart([])
        const response = await axios.post('https://react-express-heroku-nguyen.herokuapp.com/create-checkout-session', order);
        const result = await stripe.redirectToCheckout({
            sessionId: response.data.id,
        })
        ;
        if (result.error){
            console.log(result.error.message)            
        }
    }
    
    return (
        <Container>
            <Typography variant="h5">Your Orders</Typography>
            {(JSON.parse(localStorage.getItem("cart")) == null || JSON.parse(localStorage.getItem("cart")).length === 0) && <Typography style={{margin: '15px 0px'}}>Your cart is empty at the moment</Typography>}
            <Grid container spacing={3}>
                {(JSON.parse(localStorage.getItem("cart")) != null && JSON.parse(localStorage.getItem("cart")).length>0 ) && JSON.parse(localStorage.getItem("cart")).map(item => (
                    <Grid item xs={12} md={4} key={item.item.id}>
                        <CartItem item={item} handleChange={handleChange}></CartItem>
                    </Grid>
                ))}
            </Grid>
            <Button onClick={() => handleCheckout()} variant="contained" disabled={JSON.parse(localStorage.getItem("cart")) == null || JSON.parse(localStorage.getItem("cart")).length===0 } style={{marginTop: 20}}>Checkout</Button>
            
        </Container>
    )
}

export default Cart
