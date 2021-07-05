import { Card, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Benefit1 from '../../img/Home/benefit1.jpg'
import Benefit2 from '../../img/Home/benefit2.jpg'
import Benefit3 from '../../img/Home/benefit3.jpg'

const useStyles= makeStyles(theme=>({
    container: {        
        backgroundColor:'#FF8C42',
        textAlign: 'center',
        height: '800px',
        [theme.breakpoints.down("sm")]: {
            height: '2000px',
            padding: '0px 40px'
        }
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
        fontSize: 70,
        fontWeight: 700,
        color: '#F3f3ea'
    }
}))

const Benefits = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <Typography variant="h4" className={classes.title}>Here's What Great About Us</Typography><br/>
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
                            <Typography> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit scelerisque in dictum non consectetur a erat nam at. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam. Eget est lorem ipsum dolor. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. </Typography>
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
                            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit scelerisque in dictum non consectetur a erat nam at. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam. Eget est lorem ipsum dolor. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Vitae sapien pellentesque habitant morbi tristique senectus et. Nam aliquam sem et tortor consequat id porta nibh venenatis.</Typography>
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
                            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit scelerisque in dictum non consectetur a erat nam at. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam. Eget est lorem ipsum dolor. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Vitae sapien pellentesque habitant morbi tristique senectus et. Nam aliquam sem et tortor consequat id porta nibh venenatis. Elit sed vulputate mi sit amet mauris commodo quis imperdiet. A scelerisque purus semper eget duis at tellus at. Etiam tempor orci eu lobortis elementum nibh tellus molestie.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Benefits
