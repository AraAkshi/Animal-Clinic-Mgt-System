import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		navbar: {
			backgroundColor: '#2f4f4f',
			display: 'flex',
			justifyContent: 'space-between',
			padding: '0.3rem 2rem',
			top: 0,
			borderBottom: 'solid 1px #2f4f4f',
			opacity: 0.9,
		},

		main: {
			marginTop: 20,
			padding: 10,
		},

		uploadPaper: {
			marginTop: 20,
			padding: 10,
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 200,
			marginLeft: 5,
			marginRight: 5,
			marginBottom: 10,
			marginTop: 10,
		},
		labelText: {
			backgroundColor: 'white',
			paddingLeft: 3,
			paddingRight: 3,
		},
		headerText: {
			fontSize: '1.1vw',
			paddingLeft: 10,
			fontWeight: 'bold',
			fontFamily: 'Helvetica',
			marginBottom: 8,
		},
		paperText: {
			fontSize: '1vw',
			textAlign: 'center',
		},
		table: {
			minWidth: 250,
			marginBottom: 20,
		},
		avatar: {
			width: theme.spacing(3),
			height: theme.spacing(3),
			fontFamily: 'century gothic',
			fontSize: '1.2vw',
			fontWeight: 'bold',
			backgroundColor: '#233868',
		},

		btn: {
			backgroundColor: '#12327C',
			fontFamily: 'arial',
			fontSize: '1vw',
		},
	})
);
