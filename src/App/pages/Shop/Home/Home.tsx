import { isMobile } from 'mobile-device-detect';
import React from 'react';
import './Home.scss';

export default ({
	state,
	dispatchFunction,
}: {
	state: any;
	dispatchFunction: Function;
}) => {
	return (
		<div id="shop">
			<div
				className={isMobile ? 'header mobile' : 'header'}
				role="header"
			>
				<div
					className={
						isMobile ? 'header-wrapper mobile' : 'header-wrapper'
					}
				>
					<h1>Shop</h1>
				</div>
			</div>

			<section className={isMobile ? 'main mobile' : 'main'}>
				<h1>Coming Soon</h1>
				<span>
					Stay tuned for our online shop. Sale though Instagram and
					email has launched!
				</span>
			</section>
		</div>
	);
};
