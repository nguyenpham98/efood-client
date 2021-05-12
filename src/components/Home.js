
import { makeStyles } from '@material-ui/core'
import React from 'react'
import Benefits from './Home/Benefits'
import Bonus  from './Home/Bonus'
import Hero from './Home/Hero'
import Social from './Home/Social'

const useStyles = makeStyles(theme=>({
    container: {
        
    }
}))

const Home = () => {  
    const classes = useStyles()  
    return (
        <div className={classes.container}>
            <Hero></Hero>
            <Social></Social>
            <Benefits></Benefits>
            <Bonus></Bonus>
        </div>
    )
}

export default Home
