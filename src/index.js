import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { CookiesProvider } from "react-cookie";
import './index.css';
import './bootstrap.min.css';
import App from './App';
import { UserContextProvider } from './store/UserContext'
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

ReactDOM.render(
    <CookiesProvider>
        <UserContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserContextProvider>
    </CookiesProvider>,
    document.getElementById('root')
 );
