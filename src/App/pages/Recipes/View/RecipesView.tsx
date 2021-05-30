import React, { useEffect, useState } from 'react';

import Timer from '@material-ui/icons/Timer';
import Restaurant from '@material-ui/icons/Restaurant';
import Speed from '@material-ui/icons/Speed';

import Kitchen from '@material-ui/icons/Kitchen';
import MenuBook from '@material-ui/icons/MenuBook';

import { isMobileOnly as isMobile } from 'mobile-device-detect';

import { useParams } from 'react-router-dom';
import { getRecipe, getRemoteAsset, MIX, Recipe } from '../../../../firebase';
import './RecipesView.scss';
import {
	Card,
	CardContent,
	CardHeader,
	Divider,
	List,
	ListItem,
} from '@material-ui/core';

export default () => {
	let { mix, recipeID } = useParams<{ mix: MIX; recipeID: string }>();
	let [recipe, setRecipe] = useState<Recipe | null>(null);

	useEffect(() => {
		getRecipe(mix, recipeID)
			.then((val: Recipe) => {
				setRecipe(val);
			})
			.catch((reason) => {
				console.error(reason);
			});

		return () => {
			setRecipe(null);
		};
	}, []);

	return recipe == null ? <LoadingScreen /> : <RecipeView recipe={recipe} />;
};

function LoadingScreen() {
	return (
		<div className="loading">
			<div className="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

function RecipeView({ recipe }: { recipe: Recipe }) {
	let [banner, setBanner] = useState<string | null>(null);

	useEffect(() => {
		getRemoteAsset(recipe.data.banner).then((val) => {
			let img = new Image();
			img.onload = () => setBanner(val);
			img.src = val;
		});

		return () => {
			setBanner(null);
		};
	}, []);

	return (
		<div id="recipe-container">
			<div
				className={banner != null ? 'header' : 'header loading'}
				style={
					banner != null
						? { backgroundImage: `url('${banner}')` }
						: {}
				}
				role="header"
			>
				<div
					className={
						isMobile ? 'mobile header-wrapper' : 'header-wrapper'
					}
				>
					<h1>{recipe.data.name}</h1>
					<div className="details">
						<span>
							<Timer />
							<p>{recipe.data.time}</p>
						</span>
						<span>
							<Restaurant />
							<p>{recipe.data.servings}</p>
						</span>
						<span>
							<Speed />
							<p>{recipe.data.complexity}</p>
						</span>
					</div>
				</div>

				{banner != null ? (
					''
				) : (
					<div className="loading-container">
						<div className="lds-ellipsis">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				)}
			</div>
			<div className={isMobile ? 'recipe mobile' : 'recipe'}>
				<Card>
					<CardContent>{recipe.data.description}</CardContent>
				</Card>
				<Card>
					<CardHeader
						title={
							<>
								<Kitchen />
								<h1>Ingredients</h1>
							</>
						}
					/>
					<CardContent>
						<List>
							{recipe.data.ingredients.map((value, index) => {
								return (
									<div className="item" key={index}>
										<span className="amount">
											{value.amount} {value.unit}
										</span>
										<span className="name">
											{value.name}
										</span>
									</div>
								);
							})}
						</List>

						{recipe.data.optionalExtras ? (
							<>
								<h2 className="optional">
									Optional Ingredients
								</h2>
								<List>
									{recipe.data.optionalExtras.map(
										(value, index) => {
											return (
												<div
													className="item"
													key={index}
												>
													<span className="amount">
														{value.amount}{' '}
														{value.unit}
													</span>
													<span className="name">
														{value.name}
													</span>
												</div>
											);
										}
									)}
								</List>
							</>
						) : (
							' '
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader
						title={
							<>
								<MenuBook />
								<h1>Method</h1>
							</>
						}
					/>
					<CardContent>
						<List
							className={
								isMobile ? 'methodList mobile' : 'methodList'
							}
						>
							{recipe.data.method.map(
								({ description, title, note }, index) => {
									return (
										<div
											className="method-list-item"
											key={index}
										>
											<ListItem>
												<h1>
													Step {index + 1}: {title}
												</h1>
												<p>{description}</p>
												{note ? (
													<em>Tip: {note}</em>
												) : (
													' '
												)}
											</ListItem>
											{index + 1 <
											recipe.data.method.length ? (
												<Divider />
											) : (
												' '
											)}
										</div>
									);
								}
							)}
						</List>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
