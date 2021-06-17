import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { isMobile } from 'mobile-device-detect';
import React, { lazy, Suspense } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import Loading from '../components/Loading/Loading';
import './App.scss';

const IndexPage = lazy(() => import('./pages/Index/Index').then((m) => m));
const ContactPage = lazy(() =>
	import('./pages/Contact/Contact').then((m) => m)
);
const PrivacyPolicy = lazy(() =>
	import('./pages/Privacy/Privacy').then((m) => m)
);

const RecipesPage = lazy(() =>
	import('./pages/Recipes/Recipes').then((m) => m)
);

const ShopPage = lazy(() => import('./pages/Shop/Shop').then((m) => m));

export const App = () => {
	return (
		<div id="container" className={isMobile ? 'mobile' : 'desktop'}>

			<PayPalScriptProvider
				options={{
					'client-id':
						'ATT7kGCaTEi5EGQ-Zk1hyxbkeNoKR8rm95fjcIpyNHoJ_sQ5-DCRd3unkZG9AXlYUX9Ci8dLIN3jIpbD',
					currency: 'NZD',
				}}
			>
				<Router>
					<Header />
					<main>
						<Switch>
							<Route path="/" exact>
								<Suspense fallback={<Loading />}>
									<IndexPage />
									<Footer />
								</Suspense>
							</Route>
							<Route path="/contact" exact>
								<Suspense fallback={<Loading />}>
									<ContactPage />
									<Footer />
								</Suspense>
							</Route>
							<Route path="/privacy" exact>
								<Suspense fallback={<Loading />}>
									<PrivacyPolicy />
									<Footer />
								</Suspense>
							</Route>
							<Route path="/recipes">
								<Suspense fallback={<Loading />}>
									<RecipesPage />
									<Footer />
								</Suspense>
							</Route>
							<Route path="/shop">
								<Suspense fallback={<Loading />}>
									<ShopPage />

									<Footer />
								</Suspense>
							</Route>
              	<Route path="/chocolate" exact>
							<Redirect to="/recipes/chocolate" />
						</Route>
						<Route path="/sweet" exact>
							<Redirect to="/recipes/sweet" />
						</Route>
						<Route path="/savoury" exact>
							<Redirect to="/recipes/savoury" />
						</Route>
						</Switch>
					</main>
				</Router>
			</PayPalScriptProvider>
		</div>
	);
};
