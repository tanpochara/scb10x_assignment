import React from 'react';
import PartyCard from './PartyCard';
import { useSelector } from 'react-redux';
import { Grid , makeStyles, CircularProgress} from '@material-ui/core';


const useStyle = makeStyles((theme) => ({
    mainContainer: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft : '20px',
      paddingRight : '20px'

    },
    smMargin: {
      margin: theme.spacing(1),
    },
    actionDiv: {
      textAlign: 'center',
    },
  }));
function PartyCardGroup({ currentId ,setCurrentId , user }) {
    const parties = useSelector((state) => state.parties);
    const classes = useStyle();

  return (
      !parties.length ? <CircularProgress /> : (
          <Grid className={classes.mainContainer} container alignItems='center' spacing = {3}>
              {parties.map((party) => 
                  <Grid key = {party._id} item xs={12} sm={4}>
                    <PartyCard party={party} setCurrentId = {setCurrentId} currentId = {currentId} user = {user}/>
                  </Grid>)}
          </Grid>
      )
  );
}

export default PartyCardGroup;
