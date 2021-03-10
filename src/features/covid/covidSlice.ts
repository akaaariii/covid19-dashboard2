import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store'
import dataDaily from './apiDataDaily.json'

const apiUrl = 'https://api.covid19api.com/total/country';

type DATADAILY = typeof dataDaily; // to set the datatype

type covidState = {
  daily: DATADAILY;
  country: string;
};

const initialState: covidState = {
  daily: dataDaily,
  country: "Japan",
};

export const fetchAsyncGetDaily = createAsyncThunk(
  'covid/getDaily', // action type
  async (country: string) => {
    const { data } = await axios.get<DATADAILY>(`${apiUrl}/${country}`);
    return { data, country };
  }
);

const covidSlice = createSlice({
  name: 'covid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetDaily.fulfilled, (state, action) => {
      return {
        ...state,
        daily: action.payload.data,
        country: action.payload.country
      }
    });
  },
});

// The function below is called a selector
// `useSelector((state: RootState) => state.covid.value)`
export const selectDaily = (state: RootState) => state.covid.daily;
export const selectCountry = (state: RootState) => state.covid.country;


export default covidSlice.reducer;