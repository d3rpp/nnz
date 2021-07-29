import { isMobile } from 'mobile-device-detect';

//@ts-ignore
import { LogoWhite } from '../../../assets';

import React, { useRef, useEffect } from 'react';
import './Index.scss';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/analytics';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Image from '../../../components/Image';

export default React.memo(() => {
	let element = useRef<HTMLElement>(null);

	useEffect(() => {
		firebase.analytics().logEvent('page_view', { page_title: 'Index' });
	}, []);

	return (
		<div id="index">
			<section
				className={
					isMobile ? 'section landing mobile' : 'section landing'
				}
			>
				<div className="landing-text-container">
					<span style={{ flex: '1 1 auto' }}></span>
					<span style={{ flex: '1 1 auto' }}></span>

					<Image
						className="img"
						src={LogoWhite}
						alt="the NurtureNZ Logo"
						colour="#e5e5e5"
					/>

					<div className={isMobile ? 'slogan mobile' : 'slogan'}>
						<span className="first">
							&nbsp;Reinvent Your Pantry&nbsp;
						</span>
						<div>-</div>
						<span className="last">
							&nbsp;Flexible Dry Food Mixes&nbsp;
						</span>
					</div>
					<span style={{ flex: '1 1 auto' }}></span>
					<a
						className={isMobile ? 'mobile' : ''}
						aria-label="About Us"
						aria-labelledby="Index Header"
						title="Scroll About Us"
						href="#about"
					>
						<ArrowDownward />
					</a>
					<span style={{ flex: '1 1 auto' }}></span>
				</div>
			</section>
			<section
				className={isMobile ? 'section about mobile' : 'section about'}
				ref={element}
				id="about"
			>
				<h1>Who are we?</h1>

				<p>
					NurtureNZ is a&nbsp;
					<a
						href="http://youngenterprise.org.nz"
						target="_blank"
						rel="noreferrer"
					>
						Young Enterprise Scheme
					</a>
					&nbsp;business, run with the goal of repurposing household
					food waste across New Zealand. We do this by encouraging our
					customers to use their leftover fruit, vegetables, and other
					food to create new dishes. Our dry food mixes give you the
					flexibility of incorporating a variety of ingredients to
					make a multitude of different goods. For more about the
					team&nbsp;<Link to="/contact#meet">click here</Link>.
				</p>

				<h1>What do we do?</h1>

				<p>
					We offer three mixes, our Savoury Base Mix, our Chocolate
					Base Mix and our Sweet Base Mix. These can be used to make a
					multitude of things from muffins to pizza! We encourage you
					to get creative with how you use our mixes, but if you need
					some inspiration, check out some of our personal favourite
					recipes <Link to="/recipes">here</Link>.
				</p>

				<h1>How do we do it?</h1>

				<p>
					All three of our mixes have been designed to create numerous
					baked goods using the one mix. Where our competitors will
					sell you a mix designed to make a cake or a brownie; we will
					sell you mix that will make cakes, brownies, scones, pizza
					dough, and more. The flexibility of our mixes means that you
					can take whatever leftovers you have - that would otherwise
					have been thrown out - and make something that suits what
					you have, and what you want, to eat.
				</p>
			</section>
		</div>
	);
});
