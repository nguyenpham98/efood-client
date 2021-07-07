import { Card, CardContent, makeStyles,  Typography, Grid, CardHeader, Avatar } from '@material-ui/core'
import React, {  useEffect, useState } from 'react'
import {reviews} from '../constants/reviews'
const useStyles = makeStyles(theme => ({
    container: {
        overflowWrap: 'break-word',
        textAlign: 'center',
        height: '600px',
        backgroundColor: '#ffd699',
        padding: '10px 0px',
        [theme.breakpoints.down("sm")]: {
            height: '900px', 
            textAlign: 'center',
        }
    },
    card: {
        height:'300px',
        margin: '30px',   
        
        [theme.breakpoints.down("sm")]: {
            height: '220px',
            margin: '15px 10px',
            
        }
    },
    title: {
        
        paddingTop: '100px',
        fontWeight: 300,
        [theme.breakpoints.down("sm")]: {
            paddingTop: '10px'

        }
        
    }
}))

const Social = () => {    
    const [index, setIndex] = useState(0);
    const classes = useStyles();
    useEffect(()=>{
        let timer = setTimeout(() => {
            if (index < reviews.length - 3) {
                setIndex(index + 1)
            }
            else setIndex(0);

        }, 3000);
        return () => clearTimeout(timer);
    })
    
    
    return (
        <div className={classes.container}>
            <Typography variant="h2" className={classes.title}>Check Out Our Best Reviews</Typography>
            
            <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                <Grid item xs={12} sm={3} >
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="initial" style={{backgroundColor: 'red'}}>
                                    {reviews[index].author[0]}
                                </Avatar>
                            }                            
                        />
                        <CardContent>
                            <Typography variant="h5">“{reviews[index].text}”</Typography>
                            <Typography variant="h6">- {reviews[index].author} </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="initial" style={{ backgroundColor: 'green' }}>
                                    {reviews[index+1].author[0]}
                                </Avatar>
                            }
                        />
                        <CardContent>
                            <Typography variant="h5">“{reviews[index+1].text}”</Typography>
                            <Typography variant="h6">- {reviews[index+1].author} </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card className={classes.card }>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="initial" style={{ backgroundColor: 'blue' }}>
                                    {reviews[index+2].author[0]}
                                </Avatar>
                            }
                        />
                        <CardContent>
                            <Typography variant="h5">“{reviews[index+2].text}”</Typography>
                            <Typography variant="h6">- {reviews[index+2].author} </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
            
        </div>
    )
}

export default Social
