import React, { useEffect } from 'react';
import './Shop.scss';

import firebase from 'firebase/app';
import 'firebase/analytics';

import { isMobile } from 'mobile-device-detect';

export default () => {
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

			<section className="main">
				<h1>Coming Soon</h1>
				<span>
					We will announce on our facebook page when this is ready!
				</span>
			</section>
		</div>
	);
};
