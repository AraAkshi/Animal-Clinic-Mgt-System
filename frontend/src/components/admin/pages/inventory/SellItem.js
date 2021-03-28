import {
	Grid,
	Button,
	TextField,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	IconButton,
	TableContainer,
	Paper,
	Modal,
	Backdrop,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { editItem, getAllItems } from '../../../../services/inventory';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Receipt from './Receipt';
import { addRecord } from '../../../../services/sales';

function SellItem() {
	const [items, setItems] = useState([]);
	const [selectedItems, setselectedItems] = useState([]);
	const [selectedItem, setselectedItem] = useState();
	const [newQty, setNewQty] = useState();
	const [open, setOpen] = useState(false);

	const onSubmit = async () => {
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

			const salesRes = await addRecord(
				selectedItems[i].name,
				selectedItems[i].category,
				selectedItems[i].newSales,
				selectedItems[i].newSales * selectedItems[i].unitSellingPrice
			);
			if (res !== undefined && salesRes !== undefined) {
				setOpen(true);
			}
		}
	};

	const onCancel = () => {
		window.open(window.location.origin + '/admin/inventory', '_self');
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

	const handleQty = (e) => {
		setNewQty(e.target.value);
	};

	const handleDelete = (item) => {
		const newList = selectedItems.filter((i) => i.name !== item.name);
		setselectedItems(newList);
	};

	const handleClose = () => {
		setOpen(false);
		window.open(window.location.origin + '/admin/inventory', '_self');
	};

	useEffect(() => {
		async function fetchData() {
			const itemRes = await getAllItems();
			if (itemRes !== undefined) setItems(itemRes);
		}
		fetchData();
	}, [selectedItems, selectedItem]);

	return (
		<div>
			<Header />
			<Sidebar />
			<div className='sidebar-container'>
				<div className='purchase-form'>
					<form className='form'>
						<Grid
							container
							direction='row'
							spacing={1}
							style={{ padding: '2rem' }}
						>
							<Grid item xs={6}>
								<Autocomplete
									freeSolo
									options={items.map((item) => item.name)}
									onChange={(e, newValue) => {
										handleSelectItem(newValue);
									}}
									renderInput={(params) => (
										<TextField {...params} size='small' variant='outlined' />
									)}
								/>
							</Grid>
							<Grid item xs={3}>
								<TextField
									size='small'
									label='Quantity'
									variant='outlined'
									value={newQty}
									onChange={handleQty}
								/>
							</Grid>
							<Grid item xs={3}>
								<Button
									startIcon={<AddIcon />}
									size='small'
									variant='contained'
									color='secondary'
									onClick={addToList}
								>
									ADD
								</Button>
							</Grid>
						</Grid>
						<Grid container direction='row' justify='center'>
							<Grid item xs={10}>
								<TableContainer component={Paper}>
									<Table size='small' stickyHeader>
										<TableHead>
											<TableRow>
												<TableCell>Brand</TableCell>
												<TableCell>Name</TableCell>
												<TableCell>Quantity</TableCell>
												<TableCell>Unit Price</TableCell>
												<TableCell>Price</TableCell>
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
														<TableCell>{item.brand}</TableCell>
														<TableCell>{item.name}</TableCell>
														<TableCell>{item.newSales}</TableCell>
														<TableCell>{item.unitSellingPrice}</TableCell>
														<TableCell>
															{item.unitSellingPrice * item.newSales}
														</TableCell>
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
													<TableCell>No Items Added</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</TableContainer>
							</Grid>
						</Grid>
						<Grid
							container
							direction='row'
							spacing={3}
							justify='center'
							style={{ padding: '1rem', marginTop: '0.5rem' }}
						>
							<Grid item>
								<Button
									size='small'
									variant='contained'
									color='secondary'
									onClick={onCancel}
								>
									CANCEL
								</Button>
							</Grid>
							<Grid item>
								<Button
									size='small'
									variant='contained'
									color='secondary'
									onClick={onSubmit}
								>
									OK
								</Button>
							</Grid>
						</Grid>
					</form>
				</div>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				style={{
					height: '100vh',
					width: '65vw',
					margin: 'auto',
					marginTop: '0.1rem',
					overflowY: 'auto',
					backgroundColor: '#fff',
					// width: '80vw',
				}}
				BackdropComponent={Backdrop}
			>
				<Receipt selectedItems={selectedItems} />
			</Modal>
		</div>
	);
}

export default SellItem;
