import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './global.scss';
import { App } from './App/App';
import { init as firebaseInit } from './firebase';

import smoothscroll from 'smoothscroll-polyfill';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

firebaseInit();

ReactDOM.render(
	// <React.StrictMode>
	<App />,
	// </React.StrictMode>
	document.querySelector('#root')
);

smoothscroll.polyfill();
