import React from 'react';
import styles from './Chart.module.css';
import { Line } from 'react-chartjs-2';

import { useSelector } from 'react-redux';
import { selectDaily } from '../covidSlice';

const Chart : React.FC = () => {
  const daily = useSelector(selectDaily);
  const dates = daily.map(({ Date }) => Date);

  const lineChart = daily[0] && (
    <Line 
      data={{
        labels: dates.map((date) => new Date(date).toDateString()),
        datasets: [
          {
            data: daily.map((data) => data.Confirmed),
            label: 'Infected',
            borderColor: '#1C4E80',
            showLine: false,
          },
          {
            data: daily.map((data) => data.Recovered),
            label: 'Recovered',
            borderColor: '#A5D8DD',
            showLine: false,
          },
          {
            data: daily.map((data) => data.Deaths),
            label: 'Deaths',
            borderColor: '#EA6A47',
            showLine: false,
          },
        ]
      }}
    />
  );

  return (
    <div className={styles.container}>
      {lineChart}
    </div>
  )
}

export default Chart
