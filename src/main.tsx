import React from 'react';
import ReactDOM from 'react-dom';
import './global.scss';
import { App } from './App/App';
import { init as firebaseInit } from './firebase';

// @ts-ignore
import smoothscroll from 'smoothscroll-polyfill';

firebaseInit();

// getRecipe('chocolate', '95bJA1oyWKmxltQvdpdW').then((value) =>
// 	console.log(value)
// );

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.querySelector('#root')
);

smoothscroll.polyfill();
