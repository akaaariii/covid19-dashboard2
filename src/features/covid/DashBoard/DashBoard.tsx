import React, { useEffect } from 'react';
import styles from './DashBoard.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Container, Grid } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { selectDaily, fetchAsyncGetDaily } from '../covidSlice';
import SwitchCountry from '../SwitchCountry/SwitchCountry';
import Cards from '../Cards/Cards';
import Chart from '../Chart/Chart';
import PieChart from '../PieChart/PieChart';


const useStyles = makeStyles((theme) => ({
  backgroundcolor: { backgroundColor: '#283544' },
  fontbold: { fontWeight: 'bold' },
  title: { flexGrow: 1 },
  content: { marginTop: 85 }, 
}));


const DashBoard : React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const daily = useSelector(selectDaily);

  useEffect(() => {
    dispatch(fetchAsyncGetDaily("japan"));
  }, [dispatch]);

  return (
    <main>
      <AppBar position="absolute">
        <Toolbar className={classes.backgroundcolor}>
          <Typography variant="h5" className={classes.title+" "+styles.titleFont}>
            COVID-19 Live Dashboard
          </Typography>
          <div>
            <Typography variant="body1" className={styles.dateFont}>
              Updated : {new Date(daily[daily.length - 1].Date).toDateString()}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <Container className={classes.content}>
        <div className={styles.container}>
            <SwitchCountry />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Cards />
          </Grid>
          <Grid item xs={12} md={7}>
            <Chart />
          </Grid>
          <Grid item xs={12} md={5}>
            <PieChart />
          </Grid>
        </Grid>
      </Container>      
    </main>
  )
}

export default DashBoard
