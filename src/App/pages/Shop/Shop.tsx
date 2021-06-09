import React, { useEffect } from 'react';
import './Shop.scss';

import firebase from 'firebase/app';
import 'firebase/analytics';

import { isMobile } from 'mobile-device-detect';

export default React.memo(() => {
	useEffect(() => {
		firebase.analytics().logEvent('page_view', { page_title: 'Shop' });
	}, []);

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
});
