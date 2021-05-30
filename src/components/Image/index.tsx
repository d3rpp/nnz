import React from 'react';
import ProgressiveImage from 'react-progressive-graceful-image';
import './image.scss';

const placeholder = (
	<div className="img-loading-container">
		<div className="lds-ellipsis">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
);

export default ({
	src,
	alt,
	className,
}: {
	src: string;
	alt?: string;
	className?: string;
}) => {
	return (
		<ProgressiveImage src={src} placeholder="">
			{/* @ts-ignore */}
			{(src, loading) => {
				return loading ? (
					placeholder
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
