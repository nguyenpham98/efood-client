
import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React from 'react'


const useStyles= makeStyles((theme)=> ({
    root:{
        maxWidth: 300,        
        textAlign:'center',
        //border: "none",
        //boxShadow:"none"
    },
    media: {
        width: 300,
        height: 200,
        objectFit: 'cover'
    },
    title:{
        fontWeight: 700,
        color: '#EA9939'
    }

    
}))
// part of /menu
const CategoryCard = ({image, title, handleClick, category}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root} onClick={()=>handleClick(category)}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" className={classes.title}>{title}</Typography>
                </CardContent>         
            </CardActionArea>
        </Card>
    )
}

export default CategoryCard
