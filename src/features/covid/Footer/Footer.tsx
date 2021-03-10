import React from 'react';
import './Footer.module.css';

const Footer : React.FC = () => {
  return (
    <footer>
      Copyright &copy; 2021 Akari Tsutsui <br />
      Dashboard data from <a href="https://covid19api.com/">COVID-19 API</a>
    </footer>
  )
}

export default Footer