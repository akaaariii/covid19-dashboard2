import React from 'react';
import './App.css';
import DashBoard from './features/covid/DashBoard/DashBoard';
import Footer from './features/covid/Footer/Footer';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Lato', 'sans-serif'
    ].join(','),
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <DashBoard />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
