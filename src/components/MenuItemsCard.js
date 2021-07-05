import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React from 'react'


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        //border:"none",
        //boxShadow:"none"
    },
    media: {
        width:300,
        height:200,
        objectFit: 'cover'
    },
    title:{
        fontWeight: 700,
        color: '#EA9939'
    }
}))
// part of menu/category
const MenuItemsCard = ({item, handleClick}) => {
    const classes = useStyles();
    const categoryId = item.nickname.split("-")[0];
    const results = categoryId.split(/([0-9]+)/);
    const category = results[0];
    const id = results[1];   
    
    return (
        <Card className={classes.root} onClick={() => handleClick(category, id)} key={item.id} >
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={item.product.images[0]}
                    title={item.product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" className={classes.title}>{item.product.name}</Typography>
                    <Typography gutterBottom>{item.product.description}</Typography>
                    <Typography gutterBottom>{item.product.metadata.calorie}</Typography>
                </CardContent>


            </CardActionArea>
        </Card>
    )
}

export default MenuItemsCard
