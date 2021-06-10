import React, { useReducer, useEffect, useCallback, useState } from 'react';
import './Shop.scss';

import firebase from 'firebase/app';
import 'firebase/analytics';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { ShopState } from './util/ShopUtils';

import ShopHome from './Home/Home';

// const initialState: STATE = {
// 	status: 'EMPTY',
// 	options: {
// 		intent: 'CAPTURE',
// 		purchase_units: [
// 			{
// 				amount: {
// 					currency_code: 'NZD',
// 					value: '10.00',
// 					breakdown: {
// 						item_total: {
// 							currency_code: 'NZD',
// 							value: '10.00',
// 						},
// 					},
// 				},
// 				shipping: {
// 					address: {
// 						address_line_1: '3/1',
// 						address_line_2: 'Rata Road',
// 						admin_area_1: 'Devonport',
// 						admin_area_2: 'Auckland',
// 						country_code: 'NZ',
// 						postal_code: '0624',
// 					},
// 					name: {
// 						full_name: 'Hudson Curren',
// 					},
// 				},

// 				description: 'TEST ORDER',
// 				items: [
// 					{
// 						name: 'TEST ITEM',
// 						category: 'PHYSICAL_GOODS',
// 						quantity: '2',
// 						unit_amount: {
// 							currency_code: 'NZD',
// 							value: '5.00',
// 						},
// 						sku: 'TEST',
// 					},
// 				],
// 			},
// 		],

// 		payer: {
// 			email_address: 'hudson.curren@icloud.com',
// 		},

// 		application_context: {
// 			brand_name: 'NurtureNZ',
// 			locale: 'en-NZ',
// 			landing_page: 'BILLING',
// 			shipping_preference: 'GET_FROM_FILE',
// 			user_action: 'PAY_NOW',
// 		},
// 	},
// };

export default () => {

	useEffect(() => {
		firebase.analytics().logEvent('page_view', { page_title: 'Shop' });
	}, []);

	useEffect(() => {
		
	}, []);

	//@ts-ignore
	// const [state, dispatch] = useReducer(REDUCER, initialState);

	// const dispatchFunction = useCallback(dispatch, []);

	let { url } = useRouteMatch();

	return (
		<PayPalScriptProvider
			options={{
				'client-id': 'sb',
				currency: 'NZD',
				commit: true,
			}}
		>
			<Switch>
				<Route path={url} exact>
					<ShopHome
					// state={state}
					// dispatchFunction={dispatchFunction}
					/>
				</Route>
			</Switch>
		</PayPalScriptProvider>
	);
};
