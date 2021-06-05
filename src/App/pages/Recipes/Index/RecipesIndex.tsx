import { isMobile } from 'mobile-device-detect';
import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../../../../components/Image';

import { LogoBlack } from '../../../../assets';

import './RecipesIndex.scss';

export default ({ url }: { url: string }) => {
	return (
		<div id="recipes-index">
			<div
				className={isMobile ? 'header mobile' : 'header'}
				role="header"
			>
				<div
					className={
						isMobile ? 'header-wrapper mobile' : 'header-wrapper'
					}
				>
					<h1>Recipes</h1>
				</div>
			</div>
			<div className="options">
				<Link to={`${url}/chocolate`} className="first">
					<div className="card">
						{/* <div
							className="media"
							style={{ backgroundImage: `url('${LogoBlack}')` }}
						/> */}
						<div className="media">
							<LazyImage src={LogoBlack} colour="#222222bb" />
						</div>
						<div className="text chocolate">
							<span>
								Chocolate
								<br />
								Base&nbsp;Mix
							</span>
						</div>
					</div>
				</Link>
				<Link to={`${url}/sweet`} className="second">
					<div className="card">
						<div className="media">
							<LazyImage src={LogoBlack} colour="#222222bb" />
						</div>
						<div className="text sweet">
							<span>
								Sweet
								<br />
								Base&nbsp;Mix
							</span>
						</div>
					</div>
				</Link>
				<Link to={`${url}/savoury`} className="third">
					<div className="card">
						<div className="media">
							<LazyImage src={LogoBlack} colour="#222222bb" />
						</div>
						<div className="text savoury">
							<span>
								Savoury
								<br />
								Base&nbsp;Mix
							</span>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
};
