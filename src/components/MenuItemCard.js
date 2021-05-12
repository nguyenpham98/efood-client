
import { Button, ButtonGroup, Card,  CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React, { useState, useContext, useEffect } from 'react'
import {CartContext} from './CartContext'


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300
    },
    media: {
        width: 300,
        height: 200,
        objectFit: 'cover'
    },
    btnGroup: {
        marginBottom: 5
    }
}))
// part of menu/category
const MenuItemCard = ({ item }) => {
    const classes = useStyles();    
    const [count, setCount] = useState(1);    
    const { cart, setCart } = useContext(CartContext);
    
    const addToCart = (item, quantity) => {
        const itemIndex = cart.findIndex(cartItem => cartItem.item.id === item.id);
        if(itemIndex>=0){
            // if item already exist -> update quantity
            let currentCart = cart;
            currentCart[itemIndex].quantity+=quantity;            
            setCart(currentCart);
            
        }
        else{
            // new item
            setCart([...cart, { item: item, quantity: quantity }])
        }       
        alert("Item Added")
        localStorage.setItem('cart', JSON.stringify(cart));
        
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        
    }, [cart]);    
    
    return (
        <Card className={classes.root} key={item.id} >
            
                <CardMedia
                    className={classes.media}
                    image={item.product.images[0]}
                    title={item.nickname}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5">{item.product.name}</Typography>
                    <Typography gutterBottom variant="h6">{item.product.description}</Typography>
                    <Typography gutterBottom>${(item.unit_amount/100).toFixed(2)}</Typography>
                    
                        <ButtonGroup color="primary" variant="outlined" className={classes.btnGroup}>
                            <Button onClick={() => (count > 1 && setCount(count - 1))}>-</Button>
                            <Button>{count}</Button>
                            <Button onClick={() => setCount(count + 1)}>+</Button>
                        </ButtonGroup>
                        <br />
                        <Button variant="contained" color="secondary" onClick={() => addToCart(item, count)}>Add</Button>
                        
                    
                </CardContent>
            
        </Card>
    )
}

export default MenuItemCard
