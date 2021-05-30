import React, { useEffect } from 'react';
import './Recipes.scss';

import firebase from 'firebase/app';
import 'firebase/analytics';

import { Switch, useRouteMatch, Route } from 'react-router-dom';

import RecipesIndexPage from './Index';
import Loading from '../../../components/Loading/Loading';
import Selections from './Selections';

let ViewRecipePage = React.lazy(() => import('./View').then((m) => m));

export default () => {
	useEffect(() => {
		firebase.analytics().logEvent('page_view', { page_title: 'Recipes' });
	}, []);

	let { url } = useRouteMatch();

	return (
		<div id="recipes">
			<section className="main">
				<Switch>
					<Route path={url} exact>
						<RecipesIndexPage url={url} />
					</Route>
					<Route
						path={`${url}/chocolate`}
						exact
						children={<Selections mix="chocolate" />}
					/>
					<Route
						path={`${url}/sweet`}
						exact
						children={<Selections mix="sweet" />}
					/>
					<Route
						path={`${url}/savoury`}
						exact
						children={<Selections mix="savoury" />}
					/>
					<Route path={`${url}/:mix/:recipeID`}>
						<React.Suspense fallback={<Loading />}>
							<ViewRecipePage />
						</React.Suspense>
					</Route>
				</Switch>
			</section>
		</div>
	);
};
