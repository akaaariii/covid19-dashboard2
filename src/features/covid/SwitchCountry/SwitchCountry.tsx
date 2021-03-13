import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NativeSelect, FormControl } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { fetchAsyncGetDaily, selectCountry } from '../covidSlice';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 320,
  },
}));


const SwitchCountry : React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [countries, setCountries] = useState<Array<string>>([]);
  const country = useSelector(selectCountry);
  

  useEffect(() => {
    const getCountries = async() => {
      const slugs: string[] = [];
      const { data } = await axios.get('https://api.covid19api.com/countries');
      
      for(let i=0; i < data.length; i++){
        slugs.push(data[i].Slug)
      }
      await setCountries(slugs)
    }

    getCountries()
  }, [])
  

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
          dispatch(fetchAsyncGetDaily(e.target.value))}
      >
        <option value={country}>{`${country.charAt(0).toUpperCase()}${country.substring(1).toLowerCase()}*`}</option>
        {countries.sort().map((country, index) => (
          <option key={index} value={country}>
            {`${country.charAt(0).toUpperCase()}${country.substring(1).toLowerCase()}`}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  )
}

export default SwitchCountry
