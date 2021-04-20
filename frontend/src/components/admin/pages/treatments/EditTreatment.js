import {
	TextField,
	Button,
	Grid,
	Select,
	MenuItem,
	InputLabel,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	IconButton,
	TableContainer,
	Paper,
} from '@material-ui/core';
import React, { useState } from 'react';
import { formatDate, formatTime } from '../../../../services/appointment';
import { editTreatment } from '../../../../services/treatment';
import { getCusAnimals } from '../../../../services/animal';
import { treatmentTypes } from '../../../../services/datasets/treatment-types.d';
import { editItem } from '../../../../services/inventory';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Autocomplete } from '@material-ui/lab';

function EditTreatment(props) {
	const {
		selectedTreatment,
		setAlert,
		setOpen,
		customers,
		items,
		cusAnimals,
	} = props;
	const [animals, setAnimals] = useState(cusAnimals);
	const [selectedItem, setselectedItem] = useState();
	const [selectedItems, setselectedItems] = useState(
		selectedTreatment.itemsUsed
	);
	const [usedItems, setUsedItems] = useState(selectedTreatment.itemsUsed);
	const [newQty, setNewQty] = useState();
	const [formData, setFormData] = useState({
		id: selectedTreatment.id,
		treatmentType: selectedTreatment.treatmentType,
		customer: selectedTreatment.customer,
		animal: selectedTreatment.animal,
		description: selectedTreatment.description,
		dateReceived: formatDate(selectedTreatment.dateReceived),
		timeReceived: formatTime(selectedTreatment.timeReceived),
		nextTreatmentDate: formatDate(selectedTreatment.nextTreatmentDate),
	});

	const {
		id,
		treatmentType,
		customer,
		animal,
		description,
		dateReceived,
		timeReceived,
		nextTreatmentDate,
	} = formData;

	const onChange = async (e) => {
		const value =
			e.target.name === 'customer'
				? customers.find((item) => item.id === e.target.value)
				: e.target.name === 'animal'
				? animals.find((item) => item.id === e.target.value)
				: e.target.value;

		if (e.target.name == 'customer') {
			const animalRes = await getCusAnimals(value.id);
			if (animalRes !== undefined) setAnimals(animalRes);
		}
		setFormData({ ...formData, [e.target.name]: value });
	};

	const resetForm = () => {
		setFormData({
			id: selectedTreatment.id,
			treatmentType: selectedTreatment.treatmentType,
			customer: selectedTreatment.customer,
			animal: selectedTreatment.animal,
			description: selectedTreatment.description,
			dateReceived: formatDate(selectedTreatment.dateReceived),
			timeReceived: formatTime(selectedTreatment.timeReceived),
			nextTreatmentDate: formatDate(selectedTreatment.nextTreatmentDate),
		});

		setUsedItems(selectedTreatment.itemsUsed);
		setselectedItems(selectedTreatment.itemsUsed);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		let time = false;
		for (let i in selectedItems) {
			const res = await editItem(
				selectedItems[i].id,
				selectedItems[i].isEmpty,
				selectedItems[i].name,
				selectedItems[i].category,
				selectedItems[i].brand,
				selectedItems[i].unitPurchasePrice,
				selectedItems[i].bufferQty,
				selectedItems[i].soldQty + selectedItems[i].newSales,
				selectedItems[i].quantity - selectedItems[i].newSales,
				selectedItems[i].unitSellingPrice,
				selectedItems[i].purchasedDate,
				selectedItems[i].manufactureDate,
				selectedItems[i].expireDate,
				selectedItems[i].notifyBefore,
				selectedItems[i].batchNo
			);
			if (res !== undefined) {
				const newList = usedItems;
				newList.push(res);
				setUsedItems(newList);
			}
			time = true;
		}
		if (time === true || selectedItems.length === 0) {
			const animalRes = await editTreatment(
				id,
				treatmentType,
				customer,
				animal,
				usedItems,
				description,
				dateReceived,
				timeReceived,
				nextTreatmentDate
			);
			if (animalRes !== undefined) {
				const newAlert = [
					{
						msg: 'Treatment Details Updated Successfully',
						alertType: 'success',
						state: true,
					},
				];
				setAlert(newAlert);
				window.open(window.location.origin + `/admin/treatments`, '_self');
				setOpen(false);
			}
		}
	};

	const handleQty = (e) => {
		setNewQty(e.target.value);
	};

	const handleSelectItem = (value) => {
		const item = items.find((item) => item.name === value);
		setselectedItem(item);
	};

	const addToList = () => {
		const newList = selectedItems;
		newList.push({ ...selectedItem, newSales: parseInt(newQty) });
		setselectedItems(newList);
		setselectedItem();
	};

	const handleDelete = (item) => {
		const newList = selectedItems.filter((i) => i.name !== item.name);
		setselectedItems(newList);
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
					<Grid container direction='row' style={{ marginTop: '0.5rem' }}>
						<Grid item xs={6}>
							<InputLabel id='customer'>Customer</InputLabel>
							<Select
								labelId='customer'
								name='customer'
								value={customer.id}
								onChange={(e) => onChange(e)}
								required
							>
								{customers.length > 0 ? (
									customers.map((item) => (
										<MenuItem key={item.id} value={item.id}>
											{item.name}
										</MenuItem>
									))
								) : (
									<MenuItem>None Available</MenuItem>
								)}
							</Select>
						</Grid>
						<Grid item xs={6}>
							<InputLabel id='animal'>Animal</InputLabel>
							<Select
								labelId='animal'
								name='animal'
								value={animal.id}
								onChange={(e) => onChange(e)}
								required
							>
								{animals.length > 0 ? (
									animals.map((item) => (
										<MenuItem key={item.id} value={item.id}>
											{`${item.breed}-${item.name}`}
										</MenuItem>
									))
								) : (
									<MenuItem>None Available</MenuItem>
								)}
							</Select>
						</Grid>
					</Grid>
					<InputLabel id='treatmentType' style={{ marginTop: '0.5rem' }}>
						Treatment Type
					</InputLabel>
					<Select
						labelId='treatmentType'
						name='treatmentType'
						value={treatmentType}
						onChange={(e) => onChange(e)}
						required
					>
						{treatmentTypes.length > 0 ? (
							treatmentTypes.map((item) => (
								<MenuItem key={item.id} value={item.type}>
									{item.type}
								</MenuItem>
							))
						) : (
							<MenuItem>None Available</MenuItem>
						)}
					</Select>
					<TextField
						name='description'
						label='Description'
						size='small'
						value={description.toUpperCase()}
						onChange={(e) => onChange(e)}
						required
						multiline
						rows={3}
						style={{ marginTop: '0.5rem' }}
					/>
					<Grid container direction='row' style={{ marginTop: '0.5rem' }}>
						<Grid item xs={6}>
							<TextField
								type='date'
								name='dateReceived'
								label='Date Received'
								size='small'
								value={dateReceived}
								onChange={(e) => onChange(e)}
								required
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								type='time'
								name='timeReceived'
								label='Time Received'
								size='small'
								value={timeReceived}
								onChange={(e) => onChange(e)}
								required
							/>
						</Grid>
					</Grid>
					<TextField
						type='date'
						name='nextTreatmentDate'
						label='Next Treatment Date'
						size='small'
						value={nextTreatmentDate}
						onChange={(e) => onChange(e)}
						required
						style={{ marginTop: '0.5rem' }}
					/>
					<Grid
						container
						direction='row'
						spacing={2}
						style={{ marginTop: '0.5rem' }}
					>
						<Grid item xs={6}>
							<InputLabel id='itemsUsed'>Items Used</InputLabel>
							<Autocomplete
								freeSolo
								labelId='itemsUsed'
								options={items.map((item) => item.name)}
								onChange={(e, newValue) => {
									handleSelectItem(newValue);
								}}
								renderInput={(params) => (
									<TextField {...params} size='small' variant='outlined' />
								)}
							/>
						</Grid>
						<Grid item xs={3} style={{ marginTop: '1rem' }}>
							<TextField
								size='small'
								label='Quantity'
								variant='outlined'
								value={newQty}
								onChange={handleQty}
							/>
						</Grid>
						<Grid item xs={3} style={{ marginTop: '1rem' }}>
							<IconButton
								color='secondary'
								fontSize='small'
								onClick={addToList}
							>
								<AddIcon fontSize='small' />
							</IconButton>
						</Grid>
					</Grid>
					<Grid
						container
						direction='row'
						justify='center'
						style={{ marginTop: '0.5rem' }}
					>
						<Grid item xs={10}>
							<TableContainer component={Paper}>
								<Table size='small' stickyHeader>
									<TableHead>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell>Quantity</TableCell>
											{localStorage.userRole === 'admin' ? (
												<TableCell></TableCell>
											) : (
												''
											)}
										</TableRow>
									</TableHead>
									<TableBody>
										{selectedItems.length > 0 ? (
											selectedItems.map((item) => (
												<TableRow hover={true} key={item.id}>
													<TableCell>{item.name}</TableCell>
													<TableCell>{item.newSales}</TableCell>
													{localStorage.userRole === 'admin' ? (
														<TableCell>
															<IconButton
																color='secondary'
																fontSize='small'
																onClick={() => handleDelete(item)}
															>
																<DeleteIcon fontSize='small' />
															</IconButton>
														</TableCell>
													) : (
														''
													)}
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell>No Items Used</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
					</Grid>
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
}

export default EditTreatment;
