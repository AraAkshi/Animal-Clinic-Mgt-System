import React from 'react';
import { CardMedia } from '@material-ui/core';

function LandingItem(props) {
	const { img, title, link } = props;

	const handleClick = () => {
		window.open(window.location.origin + link, '_self');
	};

	return (
		<div>
			<div className='landingItem'>
				<CardMedia
					className='landingItemImage'
					image={img}
					onClick={handleClick}
				/>
				<p className='landingItemText'>{title}</p>
			</div>
		</div>
	);
}

export default LandingItem;
