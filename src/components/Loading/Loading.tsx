import { isMobile } from 'mobile-device-detect';
import React from 'react';
import './Loading.scss';

export default () => {
	return (
		<div id="loading" className={isMobile ? 'mobile ' : ''}>
			<div className="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};
