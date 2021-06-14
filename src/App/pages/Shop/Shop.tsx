import React, { useEffect, useState } from 'react';
import './Shop.scss';

import LazyImage from '../../../components/Image';
import { LogoBlack } from '../../../assets';

import firebase from 'firebase/app';
import 'firebase/analytics';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { isMobile } from 'mobile-device-detect';

import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { PayPalButtons } from '@paypal/react-paypal-js';

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

	// useEffect(() => {
	// 	window.sessionStorage.setItem(
	// 		'cart',
	// 		JSON.stringify({ choc: chocQTY, sw: sweetQTY, sav: savouryQTY })
	// 	);
	// }, [chocQTY, sweetQTY, savouryQTY]);

	const totalCost = () => {
		return ((chocQTY + sweetQTY + savouryQTY) * 6.99).toFixed(2);
	};

	const maxProduct = 10;

	return (
		<PayPalScriptProvider
			options={{
				'client-id': 'sb',
				currency: 'NZD',
				commit: true,
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
										onClick={() => setChocQTY(chocQTY - 1)}
										disabled={chocQTY <= 0}
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
										onClick={() => setChocQTY(chocQTY + 1)}
										disabled={chocQTY >= maxProduct}
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
										onClick={() =>
											setSweetQTY(sweetQTY - 1)
										}
										disabled={sweetQTY <= 0}
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
										onClick={() =>
											setSweetQTY(sweetQTY + 1)
										}
										disabled={sweetQTY >= maxProduct}
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
										onClick={() =>
											setSavouryQTY(savouryQTY - 1)
										}
										disabled={savouryQTY <= 0}
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
										onClick={() =>
											setSavouryQTY(savouryQTY - 1)
										}
										disabled={savouryQTY >= maxProduct}
									>
										<Add />
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="checkout"></div>
				</section>

				<section className="payment">
					<div className="card">
						<div className={isMobile ? 'price mobile' : 'price'}>
							<h1>
								Total Cost:&nbsp;
								<span className="total">${totalCost()}</span>
							</h1>
						</div>
						<div
							className="paypal-buttons"
							style={{
								opacity: parseFloat(totalCost()) <= 0 ? 0.5 : 1,
								pointerEvents:
									parseFloat(totalCost()) <= 0
										? 'none'
										: 'all',
								cursor:
									parseFloat(totalCost()) <= 0
										? 'not-allowed'
										: '',
							}}
						>
							<PayPalButtons
								style={{
									layout: 'vertical',
									label: 'checkout',
								}}
							/>
						</div>
					</div>
				</section>
			</div>
		</PayPalScriptProvider>
	);
});
