import { Button, ButtonGroup, Card, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles(theme=>({
    root:{
        maxWidth: 300
    },
    media:{
        width:300,
        height:200
    },
    btnGroup:{
        marginBottom: '5px',
        paddingTop: '10px'
    },
    title: {
        fontWeight: 700,
        color: '#EA9939'
    }
}))

const CartItem = ({item, handleChange}) => {
    const [count, setCount] = useState(item.quantity);
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardMedia
                image={item.item.product.images[0]}
                title={item.item.nickname}
                className={classes.media}           
            />            
            <CardContent>
                <Typography variant="h5" className={classes.title}>{item.item.product.name}</Typography>                
                <ButtonGroup color="primary" variant="outlined" className={classes.btnGroup}>
                    <Button onClick={() => (count > 0 && setCount(count - 1))}>-</Button>
                    <Button>{count}</Button>
                    <Button onClick={() => setCount(count+1)}>+</Button>
                </ButtonGroup>
                <br/>
                <Button variant="text" color="primary" onClick={()=>handleChange(item, count, item.quantity)}>apply changes</Button>
            </CardContent>
        </Card>       
    )
}

export default CartItem
