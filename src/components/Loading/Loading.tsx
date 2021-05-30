import React from 'react';
import './Loading.scss';

export default () => {
	return (
		<div id="loading">
			<div className="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};
