import {
	Backdrop,
	Modal,
	TextField,
	Button,
	Grid,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import React, { useState, useEffect } from 'react';
import Alerts from '../../../layout/Alerts';
import Animal from './Animal';
import { getAllTypes } from '../../../../services/petType';
import { getAllCustomers } from '../../../../services/customer';
import { addAnimal } from '../../../../services/animal';

const AddAnimal = () => {
	const [open, setOpen] = useState(true);
	const [alert, setAlert] = useState([
		{ msg: '', alertType: '', state: false },
	]);
	const [petTypes, setPetTypes] = useState([{ id: 0, name: '' }]);
	const [customers, setCustomers] = useState([]);
	const [formData, setFormData] = useState({
		name: '',
		type: '',
		breed: '',
		gender: '',
		bloodGroup: '',
		dateOfBirth: '2021-02-28',
		remarks: '',
		owner: '',
	});

	const {
		name,
		type,
		breed,
		gender,
		bloodGroup,
		dateOfBirth,
		remarks,
		owner,
	} = formData;

	useEffect(() => {
		async function fetchData() {
			const cusRes = await getAllCustomers();
			const typesRes = await getAllTypes();
			if (cusRes !== undefined) setCustomers(cusRes);
			if (typesRes !== undefined) setPetTypes(typesRes);
		}
		fetchData();
	}, [0]);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setFormData({
			name: '',
			type: '',
			breed: '',
			gender: '',
			bloodGroup: '',
			dateOfBirth: '2021-02-28',
			remarks: '',
			owner: '',
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const res = await addAnimal(
			name,
			gender,
			bloodGroup,
			dateOfBirth,
			remarks,
			breed,
			type,
			owner
		);
		if (res !== undefined) {
			const newAlert = {
				msg: 'Animal Details Added Successfully',
				alertType: 'success',
				state: true,
			};
			setAlert({ ...alert, newAlert });
			window.open(window.location.origin + `/admin/animals`, '_self');
			setOpen(false);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			{/* <Alerts alerts={alert} /> */}
			<Animal />
			<Modal
				open={open}
				onClose={handleClose}
				style={{ height: '90vh', width: '40vw', margin: 'auto' }}
				BackdropComponent={Backdrop}
			>
				<div className='addModal'>
					<form className='form' onSubmit={(e) => onSubmit(e)}>
						<Grid
							container
							direction='column'
							spacing={1}
							style={{ padding: '1rem' }}
						>
							<InputLabel id='petName'>Animal Type</InputLabel>
							<Select
								labelId='petName'
								name='type'
								value={type}
								onChange={(e) => onChange(e)}
								required
							>
								{petTypes.length > 0 ? (
									petTypes.map((item) => (
										<MenuItem key={item.id} value={item}>
											{item.name}
										</MenuItem>
									))
								) : (
									<MenuItem>No Pet Types</MenuItem>
								)}
							</Select>
							<TextField
								name='name'
								size='small'
								label='Pet Name'
								value={name.toUpperCase()}
								onChange={(e) => onChange(e)}
								style={{ marginTop: '0.5rem' }}
								required
							/>
							<TextField
								name='breed'
								label='Breed'
								size='small'
								value={breed.toUpperCase()}
								onChange={(e) => onChange(e)}
								style={{ marginTop: '0.5rem' }}
							/>
							<FormLabel component='legend' style={{ marginTop: '0.5rem' }}>
								Gender
							</FormLabel>
							<RadioGroup
								name='gender'
								value={gender}
								required
								row
								onChange={(e) => onChange(e)}
							>
								<FormControlLabel
									value='FEMALE'
									control={<Radio />}
									label='Female'
								/>
								<FormControlLabel
									value='MALE'
									control={<Radio />}
									label='Male'
								/>
							</RadioGroup>
							<TextField
								name='bloodGroup'
								label='Blood Group'
								size='small'
								value={bloodGroup.toUpperCase()}
								onChange={(e) => onChange(e)}
								style={{ marginTop: '0.5rem' }}
							/>
							<TextField
								type='date'
								size='small'
								name='dateOfBirth'
								label='Date of Birth'
								value={dateOfBirth}
								onChange={(e) => onChange(e)}
								style={{ marginTop: '0.5rem' }}
							/>
							<InputLabel id='customer' style={{ marginTop: '0.5rem' }}>
								Owner Name
							</InputLabel>
							<Select
								labelId='customer'
								name='owner'
								value={owner}
								onChange={(e) => onChange(e)}
								required
							>
								{customers.length > 0 ? (
									customers.map((item) => (
										<MenuItem key={item.id} value={item}>
											{item.name}
										</MenuItem>
									))
								) : (
									<MenuItem>No Customers</MenuItem>
								)}
							</Select>
							<TextField
								name='remarks'
								label='Remarks'
								size='small'
								value={remarks.toUpperCase()}
								onChange={(e) => onChange(e)}
								style={{ marginTop: '0.5rem' }}
							/>
						</Grid>
						<Grid
							container
							direction='row'
							spacing={3}
							justify='center'
							style={{ padding: '1rem' }}
						>
							<Grid item>
								<Button
									size='small'
									variant='contained'
									color='secondary'
									onClick={resetForm}
								>
									RESET
								</Button>
							</Grid>
							<Grid item>
								<Button
									size='small'
									variant='contained'
									color='secondary'
									onClick={onSubmit}
								>
									CONFIRM
								</Button>
							</Grid>
						</Grid>
					</form>
				</div>
			</Modal>
		</div>
	);
};

export default AddAnimal;
