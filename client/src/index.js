import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import "react-datetime/css/react-datetime.css";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
