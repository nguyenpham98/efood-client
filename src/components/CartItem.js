import { Button, ButtonGroup, Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import React, { useState } from 'react'


const CartItem = ({item, handleChange}) => {
    const [count, setCount] = useState(item.quantity);
    return (
        <Card>
            <CardMedia
                image={item.item.product.images[0]}
                title={item.item.nickname}
                style={{width:300, height:200}}           
            />            
            <CardContent>
                <Typography variant="h5">{item.item.product.name}</Typography>                
                <ButtonGroup color="primary" variant="outlined" style={{marginBottom: 5}}>
                    <Button onClick={() => (count > 0 && setCount(count - 1))}>-</Button>
                    <Button>{count}</Button>
                    <Button onClick={() => setCount(count+1)}>+</Button>
                </ButtonGroup>
                <br/>
                <Button variant="text" color="primary" onClick={()=>handleChange(item, count)}>apply changes</Button>
            </CardContent>
        </Card>
       
    )
}

export default CartItem
