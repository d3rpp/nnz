import React from 'react';
import { Link } from 'react-router-dom';
import { YESLogo } from '../../assets';
import './Footer.scss';

export default () => {
	return (
		<footer>
			<span>
				&copy; Hudson Curren 2021 |{' '}
				<Link to="/privacy">Privacy Policy</Link> | Made for NurtureNZ
			</span>

			<span>
				A{' '}
				<a href="http://youngenterprise.org.nz">
					Young Enterprise Scheme
				</a>{' '}
				Business
			</span>

			<div
				style={{
					position: 'absolute',
					bottom: '8px',
					right: '8px',
					height: '48px',
					overflow: 'hidden',
				}}
			>
				<img src={YESLogo} alt="YES Logo" style={{ height: '48px' }} />
			</div>
		</footer>
	);
};
