import React, { useEffect, useState } from 'react';
import './Shop.scss';

import LazyImage from '../../../components/Image';
import { LogoBlack } from '../../../assets';

import firebase from 'firebase/app';
import 'firebase/analytics';

import Button from '@material-ui/core/Button';

import {
	CreateOrderActions,
	OnApproveOrderActions,
	OnApproveOrderData,
	OnCancelledOrderActions,
	OnCancelledOrderData,
	PayPalScriptProvider,
	PurchaseUnit,
} from '@paypal/react-paypal-js';

import { isMobile } from 'mobile-device-detect';

import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

//@ts-ignore
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
// import {  } from '@paypal/react-paypal-js';

type orderStatus =
	| { status: 'progress' }
	| { status: 'cancelled' }
	| { status: 'error' }
	| { status: 'approved'; orderID: string };

export default React.memo(() => {
	// let choc = 0;
	// let sw = 0;
	// let sav = 0;

	useEffect(() => {
		firebase.analytics().logEvent('page_view', { page_title: 'Shop' });

		// if (window.sessionStorage.getItem('cart') != null) {
		// 	let cart = JSON.parse(window.sessionStorage.getItem('cart')!);

		// 	setChocQTY(cart.choc);
		// 	setSweetQTY(cart.sw);
		// 	setSavouryQTY(cart.sav);
		// }
	}, []);

	let [chocQTY, setChocQTY] = useState(0);
	let [sweetQTY, setSweetQTY] = useState(0);
	let [savouryQTY, setSavouryQTY] = useState(0);

	let [checkout, setCheckout] = useState(false);
	let [showResult, setShowResult] = useState(false);
	let [result, setResult] = useState<orderStatus>({ status: 'progress' });

	let [complete, setComplete] = useState(false);

	let [{ isResolved }, _] = usePayPalScriptReducer();

	function inc(code: 'ch' | 'sw' | 'sa'): void {
		if (complete) return;

		switch (code) {
			case 'ch':
				setChocQTY(chocQTY + 1);
				break;
			case 'sw':
				setSweetQTY(sweetQTY + 1);
				break;
			case 'sa':
				setSavouryQTY(savouryQTY + 1);
		}
	}

	function dec(code: 'ch' | 'sw' | 'sa'): void {
		if (complete) return;

		switch (code) {
			case 'ch':
				setChocQTY(chocQTY - 1);
				break;
			case 'sw':
				setSweetQTY(sweetQTY - 1);
				break;
			case 'sa':
				setSavouryQTY(savouryQTY - 1);
		}
	}

	function enableCheckout() {
		// dispatch({
		// 	type: 'setLoadingStatus',
		// 	value: 'pending',
		// });
		setCheckout(true);
	}

	const totalCost = (): string => {
		return ((chocQTY + sweetQTY + savouryQTY) * 6.99).toFixed(2);
	};

	const maxProduct = 10;

	return (
		<PayPalScriptProvider
			options={{
				'client-id':
					'ATT7kGCaTEi5EGQ-Zk1hyxbkeNoKR8rm95fjcIpyNHoJ_sQ5-DCRd3unkZG9AXlYUX9Ci8dLIN3jIpbD',
				currency: 'NZD',
			}}
		>
			<div id="shop">
				<div
					className={isMobile ? 'header mobile' : 'header'}
					role="header"
				>
					<div
						className={
							isMobile
								? 'header-wrapper mobile'
								: 'header-wrapper'
						}
					>
						<h1>Shop</h1>
					</div>
				</div>

				<section className={isMobile ? 'main mobile' : 'main'}>
					<div className={isMobile ? 'items mobile' : 'items'}>
						<span className="filler"></span>
						<div className="chocolate card">
							<div className="image">
								<div className="media">
									<LazyImage
										src={LogoBlack}
										colour="#222222bb"
									/>
								</div>
								<div className="text chocolate">
									<span>
										Chocolate
										<br />
										Base&nbsp;Mix
									</span>
								</div>
								<div className="input">
									<button
										onClick={() => dec('ch')}
										disabled={chocQTY <= 0 || complete}
									>
										<Remove />
									</button>
									<input
										type="number"
										value={chocQTY}
										onChange={(ev) => {
											setChocQTY(
												parseInt(ev.target.value)
											);
										}}
									/>
									<button
										onClick={() => inc('ch')}
										disabled={
											chocQTY >= maxProduct || complete
										}
									>
										<Add />
									</button>
								</div>
							</div>
						</div>
						<div className="sweet card">
							<div className="image">
								<div className="media">
									<LazyImage
										src={LogoBlack}
										colour="#222222bb"
									/>
								</div>
								<div className="text sweet">
									<span>
										Sweet
										<br />
										Base&nbsp;Mix
									</span>
								</div>
								<div className="input">
									<button
										onClick={() => dec('sw')}
										disabled={sweetQTY <= 0 || complete}
									>
										<Remove />
									</button>
									<input
										type="number"
										value={sweetQTY}
										onChange={(ev) => {
											setSweetQTY(
												parseInt(ev.target.value)
											);
										}}
									/>
									<button
										onClick={() => inc('sw')}
										disabled={
											sweetQTY >= maxProduct || complete
										}
									>
										<Add />
									</button>
								</div>
							</div>
						</div>
						<div className="savoury card">
							<div className="image">
								<div className="media">
									<LazyImage
										src={LogoBlack}
										colour="#222222bb"
									/>
								</div>
								<div className="text savoury">
									<span>
										Savoury
										<br />
										Base&nbsp;Mix
									</span>
								</div>
								<div className="input">
									<button
										onClick={() => dec('sa')}
										disabled={savouryQTY <= 0 || complete}
									>
										<Remove />
									</button>
									<input
										type="number"
										value={savouryQTY}
										onChange={(ev) => {
											setSavouryQTY(
												parseInt(ev.target.value)
											);
										}}
									/>
									<button
										onClick={() => inc('sa')}
										disabled={
											savouryQTY >= maxProduct || complete
										}
									>
										<Add />
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="checkout"></div>
				</section>

				<section className={isMobile ? 'payment mobile' : 'payment'}>
					<div className={isMobile ? 'card mobile' : 'card'}>
						<div className={isMobile ? 'price mobile' : 'price'}>
							<h1>
								Total Cost:&nbsp;
								<span className="total">${totalCost()}</span>
							</h1>
						</div>
						<div
							className="paypal-buttons"
							style={{
								opacity:
									parseFloat(totalCost()) >= 0 || showResult
										? 1
										: 0.5,
								pointerEvents:
									parseFloat(totalCost()) >= 0 || showResult
										? 'all'
										: 'none',
								cursor:
									parseFloat(totalCost()) >= 0 || showResult
										? 'initial'
										: 'not-allowed',
							}}
						>
							{checkout ? (
								<PayPalButtons
									style={{
										layout: 'vertical',
										label: 'checkout',
									}}
									disabled={!isResolved}
									// forceReRender={[chocQTY, savouryQTY, sweetQTY]}
									createOrder={(
										_,
										actions: CreateOrderActions
									) => {
										let total = totalCost();

										let unit: PurchaseUnit = {
											amount: {
												currency_code: 'NZD',
												breakdown: {
													item_total: {
														currency_code: 'NZD',
														value: total,
													},
												},
												value: total,
											},
											description: 'Order',
											items: [],
										};

										if (chocQTY > 0) {
											unit.items!.push({
												name: 'NurtureNZ Chocolate Sweet Base Mix',
												quantity: chocQTY.toString(),
												unit_amount: {
													currency_code: 'NZD',
													value: '6.99',
												},
												sku: '',
												category: 'PHYSICAL_GOODS',
											});
										}

										if (sweetQTY > 0) {
											unit.items!.push({
												name: 'NurtureNZ Sweet Base Mix',
												quantity: sweetQTY.toString(),
												unit_amount: {
													currency_code: 'NZD',
													value: '6.99',
												},
												sku: '',
												category: 'PHYSICAL_GOODS',
											});
										}

										if (savouryQTY > 0) {
											unit.items!.push({
												name: 'NurtureNZ Savoury Base Mix',
												quantity: savouryQTY.toString(),
												unit_amount: {
													currency_code: 'NZD',
													value: '6.99',
												},
												sku: '',
												category: 'PHYSICAL_GOODS',
											});
										}

										// console.log(unit);

										return actions.order.create({
											intent: 'CAPTURE',
											purchase_units: [unit],
											application_context: {
												shipping_preference:
													'GET_FROM_FILE',
											},
										});
									}}
									onApprove={(
										data: OnApproveOrderData,
										actions: OnApproveOrderActions
									) => {
										return (
											actions.order
												//@ts-ignore
												.capture()
												//@ts-ignore
												.then(() => {
													setComplete(true);
													setResult({
														status: 'approved',
														orderID: data.orderID,
													});
													setShowResult(true);
													setCheckout(false);
												})
										);
									}}
									onCancel={(
										_: OnCancelledOrderData,
										__: OnCancelledOrderActions
									) => {
										setComplete(true);
										setResult({ status: 'cancelled' });
										setShowResult(true);
										setCheckout(false);
									}}
									onError={() => {
										setComplete(true);
										setResult({ status: 'error' });
										setShowResult(true);
										setCheckout(false);
									}}
								/>
							) : showResult ? (
								<div className="results">
									{result.status == 'approved' ? (
										<>
											<h1 className="approved">
												Order Complete
											</h1>
											<span>
												Order Number: {result.orderID}
											</span>
										</>
									) : (
										''
									)}
									{result.status == 'cancelled' ? (
										<>
											<h1 className="cancelled">
												Order Cancelled
											</h1>
											<span>
												if this is unexpected, please
												refresh the page and try again.
											</span>
										</>
									) : (
										''
									)}
									{result.status == 'error' ? (
										<>
											<h1 className="error">Error</h1>
											<span>An Error has Occured</span>
										</>
									) : (
										''
									)}
								</div>
							) : (
								<div className="checkout-enable">
									<Button
										onClick={enableCheckout}
										// color={'primary'}
										className="checkout-button"
									>
										Checkout
									</Button>
								</div>
							)}
						</div>
					</div>
				</section>
			</div>
		</PayPalScriptProvider>
	);
});
