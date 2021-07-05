import { Card, CardContent, makeStyles,  Typography } from '@material-ui/core'
import React, {  useEffect, useState } from 'react'
import {reviews} from '../constants/reviews'
const useStyles = makeStyles(theme => ({
    container: {
        overflowWrap: 'break-word',
        textAlign: 'center', 
        height: '600px',
        backgroundColor: '#06AED5',
        padding: '10px 0px',
        [theme.breakpoints.down("sm")]: {
            height: '200px', 
            textAlign: 'center',
        }
    },
    card: {
        height:'150px',
        margin: '220px 450px',
        
        [theme.breakpoints.down("sm")]: {
            height: '180px',
            margin: '15px 80px'
        }
    }
}))

const Social = () => {    
    const [index, setIndex] = useState(0);
    const classes = useStyles();
    useEffect(()=>{
        let timer = setTimeout(() => {
            if (index < reviews.length - 1) {
                setIndex(index + 1)
            }
            else setIndex(0);

        }, 3000);
        return () => clearTimeout(timer);
    })
    
    
    return (
        <div className={classes.container}>
            
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5">"{reviews[index].text}"</Typography>
                    <Typography variant="h6">- {reviews[index].author} </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Social
