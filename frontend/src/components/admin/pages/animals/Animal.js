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
	TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import AddIcon from '@material-ui/icons/Add';
import { getAllAnimals } from '../../../../services/animal';
import AnimalDetails from './AnimalDetails';
import Alerts from '../../../client/layout/Alerts';
import { getAnimalTreatments } from '../../../../services/treatment';
import { Autocomplete } from '@material-ui/lab';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 12,
	},
}))(TableCell);

function Animal() {
	const [alert, setAlert] = useState([]);
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
	const [searchItem, setSearchItem] = useState(null);
	const [treatments, setTreatments] = useState([]);
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

	//set selected row value
	const handleRowSelect = async (item) => {
		setSelectedAnimal(item);
		const treatmentRes = await getAnimalTreatments(item.id);
		if (treatmentRes !== undefined) setTreatments(treatmentRes);
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

	//set searched row details
	const handleSearch = (value) => {
		const item = animals.find((item) => item.name === value);
		setSearchItem(item);
	};

	return (
		<div>
			<Alerts alerts={alert} />
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
					<Grid item xs={5}>
						<Autocomplete
							options={animals.map((item) => item.name)}
							onChange={(e, newValue) => {
								handleSearch(newValue);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									size='small'
									variant='outlined'
									style={{ backgroundColor: '#fff', fontSize: 12 }}
									placeholder='Search by Pet Name'
								/>
							)}
						/>
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
					<Grid item xs={6}>
						<TableContainer component={Paper} style={{ maxHeight: '70vh' }}>
							<Table size='small' stickyHeader>
								<TableHead>
									<TableRow>
										<StyledTableCell>Type</StyledTableCell>
										<StyledTableCell>Name</StyledTableCell>
										<StyledTableCell>Breed</StyledTableCell>
										<StyledTableCell>Owner</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{searchItem !== null && searchItem !== undefined ? (
										<TableRow
											hover={true}
											onClick={() => handleRowSelect(searchItem)}
											style={{ cursor: 'pointer' }}
										>
											<StyledTableCell>{searchItem.type.name}</StyledTableCell>
											<StyledTableCell>
												{searchItem.name.toUpperCase()}
											</StyledTableCell>
											<StyledTableCell>
												{searchItem.breed.toUpperCase()}
											</StyledTableCell>
											<StyledTableCell>{searchItem.owner.name}</StyledTableCell>
										</TableRow>
									) : animals.length > 0 ? (
										animals.map((item) => (
											<TableRow
												hover={true}
												onClick={() => handleRowSelect(item)}
												style={{ cursor: 'pointer' }}
											>
												<StyledTableCell>{item.type.name}</StyledTableCell>
												<StyledTableCell>
													{item.name.toUpperCase()}
												</StyledTableCell>
												<StyledTableCell>
													{item.breed.toUpperCase()}
												</StyledTableCell>
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
					<Grid item xs={6}>
						<AnimalDetails
							selectedAnimal={selectedAnimal}
							treatments={treatments}
							setAlert={setAlert}
						/>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default Animal;
