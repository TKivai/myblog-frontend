import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import './index.css';
import './bootstrap.min.css';
import App from './App';
import { UserContextProvider } from './store/UserContext'
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

ReactDOM.render(
    <UserContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UserContextProvider>,
    document.getElementById('root')
 );
