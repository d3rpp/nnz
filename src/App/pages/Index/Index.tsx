import { isMobile } from 'mobile-device-detect';

//@ts-ignore
import img from '../../../assets/NurtureNZW.png';

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

	const scrollDown = () => {
		// console.log('scroll');

		element!.current!.scrollIntoView({ behavior: 'smooth' });
	};
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

					<Image className="img" src={img} alt="the NurtureNZ Logo" />

					<div className={isMobile ? 'slogan mobile' : 'slogan'}>
						<span className="first">
							&nbsp;Reinvent Your Pantry&nbsp;
						</span>
						<div>-</div>
						<span className="last">
							&nbsp;Versatile Baking Mixes&nbsp;
						</span>
					</div>
					<span style={{ flex: '1 1 auto' }}></span>
					<button
						onClick={scrollDown}
						className={isMobile ? 'mobile' : ''}
						data-aos-delay="250"
						aria-label="About Us"
						aria-labelledby="Index Header"
						title="Scroll About Us"
					>
						<ArrowDownward />
					</button>
					<span style={{ flex: '1 1 auto' }}></span>
				</div>
			</section>
			<section
				className={isMobile ? 'section about mobile' : 'section about'}
				ref={element}
			>
				<h1>Who are we?</h1>

				<p>
					{/* WHAT KINDA FUCKERY IS THIS? {' '} */}
					NurtureNZ is a&nbsp;
					<a href="http://youngenterprise.org.nz" target="_blank">
						<span>Young Enterprise Scheme</span>
					</a>
					&nbsp; Virtual Business, run with the interest of reducing
					food waste throughout New Zealand. We do this by helping
					kiwis reuse leftover food and common things you might have
					left over in the fridge, like cooked vegetables or old
					fruit. Our baking mixes take advantage of this in order to
					simultaneously make amazing food and slow down the waste of
					food.
				</p>

				<h1>What do we do?</h1>

				<p>
					We have 3 main Baking Mixes, the Savoury Base Mix, the Sweet
					Chocolate Base Mix and the Sweet Base Mix, these can be used
					to make a multitude of things from muffins to pizza! We
					Encourage you to get creative with how you use these mixes,
					many different things can be made.
					<br />
					<br />
					For some amazing ideas that we have made, head on over to
					the <Link to="/recipes">Recipes</Link> to take a look at
					them!
				</p>
			</section>
		</div>
	);
});
