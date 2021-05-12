import { Card, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Benefit1 from '../../img/Home/benefit1.jpg'
import Benefit2 from '../../img/Home/benefit2.jpg'
import Benefit3 from '../../img/Home/benefit3.jpg'

const useStyles= makeStyles(theme=>({
    container: {        
        backgroundColor:'lightgreen',
        textAlign: 'center'    
    },
    gridContainer:{
        display:'flex',
        justifyContent: 'center',
    },
    card:{
        padding: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        marginBottom: '10px'
        
    },
    cardMedia:{
        height: 200,        
    },
    title:{
        paddingTop: 10,
        color: '#35baf6'
    }
}))

const Benefits = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <Typography variant="h4" className={classes.title}>What we've got for you</Typography><br/>
            <Grid container className={classes.gridContainer} >
                <Grid item xs={12} md={3}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={Benefit1}
                            title="Benefit1"
                        />
                        <CardContent>
                            <Typography variant="h6">Nice Location</Typography>
                            <Typography>We are located at a very secure and crowded location which is convenient for new and regular customers visiting.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={Benefit2}
                            title="Benefit2"
                        />
                        <CardContent>
                            <Typography variant="h6">Wide Selection of Food and Boba</Typography>
                            <Typography>Choose from 20+ items from our ever-growing menu. The ingredients are well-prepared fresh everyday from our local farmers by our most selected chefs.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={Benefit3}
                            title="Benefit3"
                        />
                        <CardContent>
                            <Typography variant="h6">Relax and Chill Atmosphere</Typography>
                            <Typography>Great music + Good Food = Nice Moments. We have the perfect setup for your everyday needs for a place to hangout.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Benefits
