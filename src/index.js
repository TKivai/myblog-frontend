import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import './index.css';
import './bootstrap.min.css';
import App from './App';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
 );
