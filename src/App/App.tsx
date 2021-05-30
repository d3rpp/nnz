import { isMobile } from 'mobile-device-detect';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
		<Router>
			<Header></Header>
			<div id="container" style={{ marginTop: isMobile ? '64px' : '' }}>
				<main>
					<Switch>
						<Route path="/" exact>
							<Suspense fallback={<Loading />}>
								<IndexPage />
							</Suspense>
						</Route>
						<Route path="/contact" exact>
							<Suspense fallback={<Loading />}>
								<ContactPage />
							</Suspense>
						</Route>
						<Route path="/privacy" exact>
							<Suspense fallback={<Loading />}>
								<PrivacyPolicy />
							</Suspense>
						</Route>
						<Route path="/recipes">
							<Suspense fallback={<Loading />}>
								<RecipesPage />
							</Suspense>
						</Route>
						<Route path="/shop">
							<Suspense fallback={<Loading />}>
								<ShopPage />
							</Suspense>
						</Route>
					</Switch>
					<Footer />
				</main>
			</div>
		</Router>
	);
};
