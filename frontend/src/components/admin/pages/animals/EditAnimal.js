import {
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
import React, { useState } from 'react';
import { editAnimal } from '../../../../services/animal';
import { formatDate } from '../../../../services/appointment';

const EditAnimal = (props) => {
	const { petTypes, customers, selectedAnimal, setAlert, setOpen } = props;
	const [formData, setFormData] = useState({
		name: selectedAnimal.name,
		type: selectedAnimal.type,
		breed: selectedAnimal.breed,
		gender: selectedAnimal.gender,
		bloodGroup: selectedAnimal.bloodGroup,
		dateOfBirth: formatDate(selectedAnimal.dateOfBirth),
		remarks: selectedAnimal.remarks,
		owner: selectedAnimal.owner,
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

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setFormData({
			name: selectedAnimal.name,
			type: selectedAnimal.type,
			breed: selectedAnimal.breed,
			gender: selectedAnimal.gender,
			bloodGroup: selectedAnimal.bloodGroup,
			dateOfBirth: formatDate(selectedAnimal.dateOfBirth),
			remarks: selectedAnimal.remarks,
			owner: selectedAnimal.owner,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const res = await editAnimal(
			selectedAnimal.id,
			selectedAnimal.isActive,
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
				msg: 'Animal Details Updates Successfully',
				alertType: 'success',
				state: true,
			};
			setAlert({ ...alert, newAlert });
			window.open(window.location.origin + `/admin/animals`, '_self');
			setOpen(false);
		}
	};

	return (
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
						<FormControlLabel value='MALE' control={<Radio />} label='Male' />
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
	);
};

export default EditAnimal;
