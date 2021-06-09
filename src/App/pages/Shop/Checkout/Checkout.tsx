import React, { useState } from 'react';
import {
	CreateOrderActions,
	CreateOrderData,
	OnApproveOrderActions,
	OnApproveOrderData,
	PayPalButtons,
} from '@paypal/react-paypal-js';
import './Checkout.scss';
import { STATE } from '../util/reducer';

export default ({
	state,
	dispatchFunction,
}: {
	state: STATE;
	dispatchFunction: any;
}) => {
	let [valid, setValid] = useState(true);

	return (
		<>
			<div className="spacer" style={{ height: '128px' }}></div>
			<div id="checkout">Hello</div>
			<PayPalButtons
				style={{
					layout: 'horizontal',
					color: 'black',
					label: 'checkout',
					shape: 'rect',
					tagline: true,
				}}
				createOrder={(
					_data: CreateOrderData,
					actions: CreateOrderActions
				) => {
					return actions.order.create(state.options);
				}}
				// @ts-ignore
				disabled={!valid}
				forceReRender={[valid]}
				onApprove={(
					data: OnApproveOrderData,
					actions: OnApproveOrderActions
				) => {
					alert(1);
				}}
			/>
		</>
	);
};
