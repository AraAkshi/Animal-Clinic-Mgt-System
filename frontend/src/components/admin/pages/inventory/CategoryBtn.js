import { ButtonBase, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { imageUrl } from '../../../../utils/imageUrl';

const useStyles = makeStyles((theme) => ({
	image: {
		position: 'relative',
		height: '10vh',
		width: '13vw',
		borderRadius: '1rem',
		[theme.breakpoints.down('xs')]: {
			width: '100% !important', // Overrides inline-style
			height: 30,
		},
		'&:hover, &$focusVisible': {
			zIndex: 1,
			'& $imageBackdrop': {
				opacity: 0.2,
			},
			'& $imageMarked': {
				opacity: 0.15,
			},
		},
	},
	focusVisible: {},
	imageButton: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.palette.common.white,
	},
	imageSrc: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: 'cover',
		backgroundPosition: 'center 40%',
	},
	imageBackdrop: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: theme.palette.common.black,
		opacity: 0.4,
		transition: theme.transitions.create('opacity'),
	},
	imageTitle: {
		position: 'relative',
		fontWeight: 'bold',
		padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
			theme.spacing(1) + 3
		}px`,
	},
}));

function CategoryBtn(props) {
	const { cat, handleCatSelect } = props;
	const { category, items } = cat;
	const classes = useStyles();
	const image = `${imageUrl}${category.imagePath}`;

	return (
		<div>
			<ButtonBase
				focusRipple
				key={category.id}
				className={classes.image}
				focusVisibleClassName={classes.focusVisible}
				onClick={() => handleCatSelect(category.id)}
			>
				<span className='badge'>{items.length}</span>
				<span
					className={classes.imageSrc}
					style={{
						backgroundImage: `url(${image})`,
					}}
				/>
				<span className={classes.imageBackdrop} />
				<span className={classes.imageButton}>
					<Typography
						component='span'
						variant='subtitle2'
						color='inherit'
						className={classes.imageTitle}
					>
						{category.name}
					</Typography>
				</span>
			</ButtonBase>
		</div>
	);
}

export default CategoryBtn;
