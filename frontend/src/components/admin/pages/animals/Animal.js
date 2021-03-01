import {
	TableContainer,
	Paper,
	Grid,
	Table,
	TableHead,
	TableCell,
	TableRow,
	Typography,
	Button,
	TableBody,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import AddIcon from '@material-ui/icons/Add';
import { getAllAnimals } from '../../../../services/animal';
import AnimalDetails from './AnimalDetails';
import Alerts from '../../../layout/Alerts';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

function Animal() {
	const [alert, setAlert] = useState([
		{ msg: '', alertType: '', state: false },
	]);
	const [animals, setAnimals] = useState([
		{
			id: 0,
			isActive: true,
			name: '',
			gender: '',
			bloodGroup: '',
			dateOfBirth: '',
			remarks: '',
			breed: '',
			enteredDate: '',
			type: { name: '' },
			owner: { name: '', id: '' },
		},
	]);
	const [selectedAnimal, setSelectedAnimal] = useState({
		id: 0,
		isActive: true,
		name: '',
		gender: '',
		bloodGroup: '',
		dateOfBirth: '',
		remarks: '',
		breed: '',
		enteredDate: '',
		type: { name: '' },
		owner: { name: '', id: '', contact: '' },
	});

	const addAnimal = () => {
		window.open(window.location.origin + '/admin/animals/add-animal', '_self');
	};

	const handleRowSelect = (item) => {
		setSelectedAnimal(item);
	};

	useEffect(() => {
		async function fetchData() {
			const res = await getAllAnimals();
			if (res !== undefined) {
				setAnimals(res);
			}
		}
		fetchData();
	}, [0]);

	return (
		<div>
			{/* <Alerts alerts={alert} /> */}
			<Header />
			<Sidebar />
			<div className='sidebar-container'>
				<Grid container direction='row' justify='space-between'>
					<Grid item>
						<Grid container direction='row' alignContent='center'>
							<Grid item>
								<Typography variant='body1' style={{ paddingTop: '0.81rem' }}>
									Total Pets Registered
								</Typography>
							</Grid>
							<Grid item>
								<div className='petStatCard'>{animals.length}</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Button
							size='small'
							color='secondary'
							startIcon={<AddIcon />}
							onClick={addAnimal}
							variant='contained'
							style={{ margin: '0.5rem' }}
						>
							New Pet
						</Button>
					</Grid>
				</Grid>
				<hr className='seperatorLine' />
				<Grid container direction='row' justify='space-between'>
					<Grid item xs={7}>
						<TableContainer component={Paper}>
							<Table size='small' stickyHeader style={{ maxHeight: '70vh' }}>
								<TableHead>
									<TableRow>
										<StyledTableCell>Type</StyledTableCell>
										<StyledTableCell>Name</StyledTableCell>
										<StyledTableCell>Breed</StyledTableCell>
										<StyledTableCell>Owner</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{animals.length > 0 ? (
										animals.map((item) => (
											<TableRow
												hover={true}
												onClick={() => handleRowSelect(item)}
												style={{ cursor: 'pointer' }}
											>
												<StyledTableCell>{item.type.name}</StyledTableCell>
												<StyledTableCell>{item.name}</StyledTableCell>
												<StyledTableCell>{item.breed}</StyledTableCell>
												<StyledTableCell>{item.owner.name}</StyledTableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<StyledTableCell>No Animals</StyledTableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={5}>
						<AnimalDetails
							selectedAnimal={selectedAnimal}
							setAlert={setAlert}
						/>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default Animal;
