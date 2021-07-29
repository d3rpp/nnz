import Phone from '@material-ui/icons/Phone';
import Email from '@material-ui/icons/Email';
import Instagram from '@material-ui/icons/Instagram';
import Facebook from '@material-ui/icons/Facebook';
import Pinterest from '@material-ui/icons/Pinterest';

import firebase from 'firebase/app';
import 'firebase/analytics';

import { isMobile } from 'mobile-device-detect';
import React, { useEffect, useState } from 'react';

import './Contact.scss';
import Image from '../../../components/Image';
import { getRemoteAsset } from '../../../firebase';
import { useLocation } from 'react-router';

//@ts-ignore
// import img from '../../../assets/NurtureNZW.png';

export default React.memo(() => {
	let [priya, setPriya] = useState<string | null>(null);
	let [hudson, setHudson] = useState<string | null>(null);
	let [theo, setTheo] = useState<string | null>(null);
	let [maddy, setMaddy] = useState<string | null>(null);
	let [carrington, setCarrington] = useState<string | null>(null);

	// useEffect(() => {}, []);

	useEffect(() => {
		firebase.analytics().logEvent('page_view', { page_title: 'Contact' });

		// let search = useLocation().search;
		// let scroll = new URLSearchParams(search).get('scroll');
		// if (scroll) {
		// 	window.scrollTo({
		// 		behavior: 'smooth',
		// 		top: window.innerHeight,
		// 		left: 0,
		// 	});
		// }

		getRemoteAsset('gs://nurturenz-main.appspot.com/people/priya.jpg').then(
			(val) => setPriya(val)
		);
		getRemoteAsset('gs://nurturenz-main.appspot.com/people/theo.jpg').then(
			(val) => setTheo(val)
		);
		getRemoteAsset('gs://nurturenz-main.appspot.com/people/maddy.jpg').then(
			(val) => setMaddy(val)
		);
		getRemoteAsset(
			'gs://nurturenz-main.appspot.com/people/hudson.jpg'
		).then((val) => setHudson(val));
		getRemoteAsset(
			'gs://nurturenz-main.appspot.com/people/carrington.jpg'
		).then((val) => setCarrington(val));
	}, []);

	const recordUsageOfSocialMedia = (name: string) => {
		// console.log(name);
		firebase.analytics().logEvent('page_view', { page_title: name });
	};

	return (
		<div id="contact">
			<div
				className={isMobile ? 'header mobile' : 'header'}
				role="header"
			>
				<div
					className={
						isMobile ? 'header-wrapper mobile' : 'header-wrapper'
					}
				>
					<h1>Contact</h1>
				</div>
			</div>
			<section className="contact">
				<div className={isMobile ? 'wrapper mobile' : 'wrapper'}>
					<div className="filler" />
					<div className="section">
						<Phone />
						<a
							href="tel:0064224521394"
							onClick={() => recordUsageOfSocialMedia('phone')}
						>
							+64 22 452 1394
						</a>
					</div>
					<div className="section">
						<Email />
						<a
							href="mailto:info@nurturenz.co.nz?subject=Inquiry%20-%20NurtureNZ"
							onClick={() => recordUsageOfSocialMedia('email')}
						>
							info@nurturenz.co.nz
						</a>
					</div>
					<div className="section">
						<Instagram />
						<a
							href="https://www.instagram.com/nurture_nz/"
							target="_blank"
							onClick={() =>
								recordUsageOfSocialMedia('instagram')
							}
						>
							@nurture.nz
						</a>
					</div>
					<div className="filler" />
					<div className="filler" />
					<div className="section">
						<Facebook />
						<a
							href="https://www.facebook.com/nurturenz.co.nz"
							target="_blank"
							onClick={() => recordUsageOfSocialMedia('facebook')}
						>
							NurtureNZ
						</a>
					</div>
					<div className="section">
						{/* Adding this icon brings me PAIN */}
						<svg
							height="512pt"
							viewBox="-32 0 512 512"
							width="512pt"
							xmlns="http://www.w3.org/2000/svg"
							className="tIkToK-icon"
						>
							<path d="m432.734375 112.464844c-53.742187 0-97.464844-43.722656-97.464844-97.464844 0-8.285156-6.714843-15-15-15h-80.335937c-8.28125 0-15 6.714844-15 15v329.367188c0 31.59375-25.707032 57.296874-57.300782 57.296874s-57.296874-25.703124-57.296874-57.296874c0-31.597657 25.703124-57.300782 57.296874-57.300782 8.285157 0 15-6.714844 15-15v-80.335937c0-8.28125-6.714843-15-15-15-92.433593 0-167.632812 75.203125-167.632812 167.636719 0 92.433593 75.199219 167.632812 167.632812 167.632812 92.433594 0 167.636719-75.199219 167.636719-167.632812v-145.792969c29.851563 15.917969 63.074219 24.226562 97.464844 24.226562 8.285156 0 15-6.714843 15-15v-80.335937c0-8.28125-6.714844-15-15-15zm0 0" />
						</svg>
						<a
							// href=""
							target="_blank"
							onClick={() => recordUsageOfSocialMedia('tiktok')}
						>
							Coming Soon!
						</a>
					</div>
					<div className="filler" />
				</div>
				<div className="attrib" id="meet">
					<div>
						<span>
							TikTok icon made by
							<a
								href="https://www.freepik.com"
								title="Freepik"
								target="_blank"
							>
								Freepik
							</a>{' '}
							from{' '}
							<a
								href="https://www.flaticon.com/"
								title="Flaticon"
								target="_blank"
							>
								www.flaticon.com
							</a>
						</span>
					</div>
				</div>
			</section>

			<section className={isMobile ? 'meet mobile' : 'meet'}>
				<h1>Meet The Team</h1>
				<div className={isMobile ? 'left mobile' : 'left'}>
					<div className="img-container">
						{priya != null ? (
							<Image src={priya} colour="#e5e5e5" />
						) : (
							<div className="img-loading-container">
								<div className="lds-ellipsis">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							</div>
						)}
					</div>
					<div className="text">
						<strong>Priya Taua, CEO</strong>
						<em>
							"{/* <!-- Blurb about values --> */}
							I really like to minimize my environmental footprint
							and always aim to reduce my food waste.
							<br />
							<br />
							{/* <!-- Blurb about outside the business --> */}
							Outside of the business I like to travel and spend
							time with family and friends."
						</em>
					</div>
				</div>
				<div className={isMobile ? 'right mobile' : 'right'}>
					<div className="text">
						<strong>Maddy Thorne, Operations</strong>
						<em>
							"{/* <!-- Blurb about values --> */}
							I am passionate about food and educating others
							around usage of what commonly results as unnessecary
							food waste.
							<br />
							<br />
							{/* <!-- Blurb about outside the business --> */}
							Outside of the business, I enjoy getting creative in
							the kitchen."
						</em>
					</div>
					<div className="img-container">
						{maddy != null ? (
							<Image src={maddy} colour="#e5e5e5" />
						) : (
							<div className="img-loading-container">
								<div className="lds-ellipsis">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className={isMobile ? 'left mobile' : 'left'}>
					<div className="img-container">
						{theo != null ? (
							<Image src={theo} colour="#e5e5e5" />
						) : (
							<div className="img-loading-container">
								<div className="lds-ellipsis">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							</div>
						)}
					</div>
					<div className="text">
						<strong>Theo Edmonds, Marketing</strong>
						<em>
							"I believe that everyone should have the opportunity
							to eat healthy meals no matter what their economic
							situation is.
							<br />
							<br />
							Outside of this business, I like to sail
							competitively and I just enjoy boating in general."
						</em>
					</div>
				</div>
				<div className={isMobile ? 'right mobile' : 'right'}>
					<div className="text">
						<strong>Carrington Brady, Human Resources</strong>
						<em>
							"I am passionate about sustainability and being eco
							friendly. The aspect of clean packaging is important
							to me so we ensure all of the NurtureNZ product
							comply with this.
							<br />
							<br />
							Outside of the business I like to surf and, like
							Theo, I like to sail competitively. I am very
							passionate about nature"
						</em>
					</div>
					<div className="img-container">
						{carrington != null ? (
							<Image src={carrington} colour="#e5e5e5" />
						) : (
							<div className="img-loading-container">
								<div className="lds-ellipsis">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className={isMobile ? 'left mobile' : 'left'}>
					<div className="img-container">
						{hudson != null ? (
							<Image src={hudson} colour="#e5e5e5" />
						) : (
							<div className="img-loading-container">
								<div className="lds-ellipsis">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							</div>
						)}
					</div>
					<div className="text">
						<strong>Hudson Curren, Finance &amp; Technology</strong>
						<em>
							"I believe that every human being should have the
							ability and knowledge to reuse any and all leftover
							food within the household, reducing food waste one
							packet at a time!
							<br />
							<br />
							Outside of this business I like to use computer code
							to make programs and I row competitively."
						</em>
					</div>
				</div>
			</section>
		</div>
	);
});
