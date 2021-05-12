import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React from 'react'


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300
    },
    media: {
        width:300,
        height:200,
        objectFit: 'cover'
    }
}))
// part of menu/category/id
const ItemCard = ({item, handleClick}) => {
    const classes = useStyles();
    const categoryId = item.nickname.split("-")[0];
    const results = categoryId.split(/([0-9]+)/);
    const category = results[0];
    const id = results[1];   
    
    return (
        <Card className={classes.root} onClick={()=>handleClick(category, id)} key={item.id}  >
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={item.product.images[0]}
                    title={item.product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5">{item.product.name}</Typography>
                </CardContent>


            </CardActionArea>
        </Card>
    )
}

export default ItemCard
