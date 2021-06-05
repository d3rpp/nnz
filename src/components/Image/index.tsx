import React from 'react';
import ProgressiveImage from 'react-progressive-graceful-image';
import './image.scss';

export default ({
	src,
	alt,
	className,
	colour,
}: {
	src: string;
	alt?: string;
	className?: string;
	colour: string;
}) => {
	return (
		<ProgressiveImage src={src} placeholder="">
			{/* @ts-ignore */}
			{(src, loading) => {
				return loading ? (
					<div className="img-loading-container">
						<div className="lds-ellipsis">
							<div style={{ backgroundColor: colour }}></div>
							<div style={{ backgroundColor: colour }}></div>
							<div style={{ backgroundColor: colour }}></div>
							<div style={{ backgroundColor: colour }}></div>
						</div>
					</div>
				) : (
					<img src={src} alt={alt} className={className} />
					// <div
					// 	style={{
					// 		backgroundImage: `url('${src}')`,
					// 		width: '100%',
					// 		height: '100%',
					// 		backgroundPosition: 'center center',
					// 		backgroundSize: 'cover',
					// 	}}
					// />
				);
			}}
		</ProgressiveImage>
	);
};
