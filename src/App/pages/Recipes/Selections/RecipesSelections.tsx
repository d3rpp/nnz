import firebase from 'firebase/app';
import 'firebase/analytics';
import { isMobile } from 'mobile-device-detect';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	listRecipes,
	RecipeThumbnail,
	MIX,
	getRemoteAsset,
} from '../../../../firebase';
import './RecipesSelection.scss';

import LazyImage from '../../../../components/Image';

export default ({ mix }: { mix: MIX }) => {
	let [items, setItems] = useState<RecipeThumbnail[] | null>(null);

	let titleText = {
		chocolate: 'Chocolate',
		sweet: 'Sweet',
		savoury: 'Savoury',
	};

	useEffect(() => {
		listRecipes(mix).then((value: RecipeThumbnail[]) => {
			// console.log(value);
			setItems(value);
		});

		firebase
			.analytics()
			.logEvent('page_view', { page_title: titleText[mix] });

		return () => {
			setItems(null);
		};
	}, []);

	return (
		<div id="recipes-selections">
			<div
				className={isMobile ? 'header mobile' : 'header'}
				role="header"
			>
				<div
					className={
						isMobile ? 'header-wrapper mobile' : 'header-wrapper'
					}
				>
					<h1>{titleText[mix]} Base Mix Recipes</h1>
				</div>
			</div>
			{items == null ? (
				<LoadingScreen />
			) : (
				<RecipePage items={items!} mix={mix} />
			)}
		</div>
	);
};

function RecipePage({ items, mix }: { items: RecipeThumbnail[]; mix: MIX }) {
	return (
		<div className="recipes-wrapper">
			{items.map((value) => {
				return (
					<RecipeCard
						key={value.id}
						bannerImage={value.data.thumbnailImage}
						name={value.data.name}
						description={value.data.shortDesc}
						fullID={value.data.fullID}
						mix={mix}
					/>
				);
			})}
		</div>
	);
}

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

function RecipeCard({
	bannerImage,
	name,
	description,
	fullID,
	mix,
}: {
	bannerImage: string;
	name: string;
	description: string;
	fullID: string;
	mix: MIX;
}) {
	let [image, setImage] = useState<string>();

	useEffect(() => {
		getRemoteAsset(bannerImage).then((val) => setImage(val));

		return () => {
			image = '';
		};
	}, []);

	return (
		<Link
			to={`/recipes/${mix}/${fullID}`}
			className={isMobile ? 'mobile' : ''}
		>
			<div className="card">
				<div className="image">
					{image ? (
						<LazyImage
							src={image}
							className="img"
							colour="#e5e5e5"
						/>
					) : (
						<div className="loading">
							<div className="lds-ellipsis">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
					)}
				</div>
				{/* <span style={{ flex: '1 1 auto' }}></span> */}
				<div className="card-header">
					<h2>{name}</h2>
					<span>{description}</span>
				</div>
			</div>
		</Link>
	);
}
