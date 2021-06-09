import React, { useReducer, useEffect, useCallback } from 'react';
import './Shop.scss';

import firebase from 'firebase/app';
import 'firebase/analytics';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import ShopHome from './Home/Home';
import ShopCheckout from './Checkout/Checkout';
import ShopStatus from './Status/Status';
import { REDUCER, STATE } from './util/reducer';

const initialState: STATE = {
	status: 'EMPTY',
	options: {
		intent: 'CAPTURE',
		purchase_units: [
			{
				amount: {
					currency_code: 'NZD',
					value: '10.00',
					breakdown: {
						item_total: {
							currency_code: 'NZD',
							value: '10.00',
						},
					},
				},
				shipping: {
					address: {
						address_line_1: '3/1',
						address_line_2: 'Rata Road',
						admin_area_1: 'Devonport',
						admin_area_2: 'Auckland',
						country_code: 'NZ',
						postal_code: '0624',
					},
					name: {
						full_name: 'Hudson Curren',
					},
				},

				description: 'TEST ORDER',
				items: [
					{
						name: 'TEST ITEM',
						category: 'PHYSICAL_GOODS',
						quantity: '2',
						unit_amount: {
							currency_code: 'NZD',
							value: '5.00',
						},
						sku: 'TEST',
					},
				],
			},
		],

		payer: {
			email_address: 'hudson.curren@icloud.com',
		},

		application_context: {
			brand_name: 'NurtureNZ',
			locale: 'en-NZ',
			landing_page: 'BILLING',
			shipping_preference: 'GET_FROM_FILE',
			user_action: 'PAY_NOW',
		},
	},
};

export default () => {
	useEffect(() => {
		firebase.analytics().logEvent('page_view', { page_title: 'Shop' });
	}, []);

	//@ts-ignore
	const [state, dispatch] = useReducer(REDUCER, initialState);

	const dispatchFunction = useCallback(dispatch, []);

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
						state={state}
						dispatchFunction={dispatchFunction}
					/>
				</Route>
				<Route path={`${url}/checkout`} exact>
					<ShopCheckout
						state={state}
						dispatchFunction={dispatchFunction}
					/>
				</Route>
				<Route path={`${url}/success`} exact>
					<ShopStatus
						status="success"
						orderID={state.orderID!}
						name={state.name!}
					/>
				</Route>
				<Route path={`${url}/error`} exact>
					<ShopStatus status="error" />
				</Route>
				<Route path={`${url}/cancelled`} exact>
					<ShopStatus status="cancelled" />
				</Route>
			</Switch>
		</PayPalScriptProvider>
	);
};
