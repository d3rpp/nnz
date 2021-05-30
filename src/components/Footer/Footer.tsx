import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export default () => {
	return (
		<footer>
			<span>
				&copy; NurtureNZ 2021 |{' '}
				<Link to="/privacy">Privacy Policy</Link> | Made with &#9829; by
				Hudson Curren
			</span>

			<span>
				A{' '}
				<a href="http://youngenterprise.org.nz">
					Young Enterprise Scheme
				</a>{' '}
				Business
			</span>
		</footer>
	);
};
