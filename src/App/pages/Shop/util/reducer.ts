import {
	CreateOptions,
	PurchaseItem,
	PurchaseUnit,
} from '@paypal/react-paypal-js';

// MIGHT USE LATER
import Firebase from 'firebase/app';
import 'firebase/analytics';

type STATUS = 'EMPTY' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED';

type ACTION =
	| {
			type: 'set_item';
			payload: { name: string; quanity: number; price: number };
	  }
	| { type: 'remove_item'; payload: { name: string } };

interface STATE {
	status: STATUS;
	orderID?: string;
	name?: string;
	options: CreateOptions;
}

function REDUCER(state: STATE, action: ACTION): STATE {
	if (action.type == 'set_item') {
		Firebase.analytics().logEvent('add_to_cart');

		// if (state.options.purchase_units === []) {
		console.log(state);

		return {
			...state,
			status: 'PROCESSING',
			options: {
				intent: 'AUTHORIZE',
				purchase_units: [
					{
						amount: {
							currency_code: 'NZD',
							value: (
								action.payload.price * action.payload.quanity
							).toFixed(2),
						},

						description: action.payload.name,
					},
				],
			},
		};
	} else if (action.type == 'remove_item') {
		return state;
	} else {
		throw Error('INVALID ACTION');
	}

	return state;
}

export { STATUS, ACTION, STATE, REDUCER };
