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
import React, { useState, useEffect } from 'react';
import Alerts from '../../../client/layout/Alerts';
import Inventory from './Inventory';
import { getAllCategories } from '../../../../services/productCategory';
import { addItem } from '../../../../services/inventory';

function AddItem() {
	const [open, setOpen] = useState(true);
	const [alert, setAlert] = useState([]);
	const [categories, setCategories] = useState([{ id: 0, name: '' }]);
	const [formData, setFormData] = useState({
		name: '',
		category: '',
		brand: '',
		unitPurchasePrice: '',
		bufferQty: '',
		quantity: '',
		unitSellingPrice: '',
		purchasedDate: '2021-01-01',
		manufactureDate: '2021-01-01',
		expireDate: '2021-01-01',
		notifyBefore: '',
		batchNo: '',
	});

	const {
		name,
		category,
		brand,
		unitPurchasePrice,
		bufferQty,
		quantity,
		unitSellingPrice,
		purchasedDate,
		manufactureDate,
		expireDate,
		notifyBefore,
		batchNo,
	} = formData;

	useEffect(() => {
		async function fetchData() {
			const res = await getAllCategories();
			setCategories(res);
		}
		fetchData();
	}, [0]);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setFormData({
			name: '',
			category: '',
			brand: '',
			unitPurchasePrice: '',
			bufferQty: '',
			quantity: '',
			unitSellingPrice: '',
			purchasedDate: '2021-01-01',
			manufactureDate: '2021-01-01',
			expireDate: '2021-01-01',
			notifyBefore: '',
			batchNo: '',
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const res = await addItem(
			name,
			category,
			brand,
			unitPurchasePrice,
			bufferQty,
			quantity,
			unitSellingPrice,
			purchasedDate,
			manufactureDate,
			expireDate,
			notifyBefore,
			batchNo
		);
		if (res !== undefined) {
			const newAlert = [
				{
					msg: 'Item Details Added Successfully',
					alertType: 'success',
					state: true,
				},
			];
			setAlert(newAlert);
			window.open(window.location.origin + `/admin/inventory`, '_self');
			setOpen(false);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Alerts alerts={alert} />
			<Inventory />
			<Modal
				open={open}
				onClose={handleClose}
				style={{
					height: '88vh',
					width: '48vw',
					margin: 'auto',
					// overflowY: 'auto',
				}}
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
							<Grid container direction='row' style={{ marginTop: '0.5rem' }}>
								<Grid item xs={6}>
									<InputLabel id='category'>Product Category</InputLabel>
									<Select
										labelId='category'
										name='category'
										value={category}
										onChange={(e) => onChange(e)}
										required
									>
										{categories.length > 0 ? (
											categories.map((item) => (
												<MenuItem key={item.id} value={item}>
													{item.name}
												</MenuItem>
											))
										) : (
											<MenuItem>No Categories</MenuItem>
										)}
									</Select>
								</Grid>
								<Grid item xs={6}>
									<TextField
										type='number'
										name='batchNo'
										label='Batch No'
										size='small'
										required
										value={batchNo}
										onChange={(e) => onChange(e)}
										style={{ marginTop: '0.5rem' }}
									/>
								</Grid>
							</Grid>
							<TextField
								name='name'
								size='small'
								label='Name'
								value={name.toUpperCase()}
								onChange={(e) => onChange(e)}
								style={{ marginTop: '0.5rem' }}
								required
							/>
							<TextField
								name='brand'
								label='Brand'
								size='small'
								value={brand.toUpperCase()}
								onChange={(e) => onChange(e)}
								style={{ marginTop: '0.5rem' }}
								required
							/>
							<Grid container direction='row' style={{ marginTop: '0.5rem' }}>
								<Grid item xs={6}>
									<Grid
										container
										direction='row'
										style={{ marginTop: '0.5rem' }}
									>
										<Grid item xs={9}>
											<TextField
												labelId='purchasePrice'
												name='unitPurchasePrice'
												label='Purchase Price(Unit)'
												size='small'
												value={unitPurchasePrice}
												onChange={(e) => onChange(e)}
												required
											/>
										</Grid>
										<Grid item xs={3}>
											<InputLabel
												id='purchasePrice'
												shrink={true}
												style={{ marginTop: '1.5rem' }}
											>
												LKR
											</InputLabel>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={6}>
									<Grid
										container
										direction='row'
										style={{ marginTop: '0.5rem' }}
									>
										<Grid item xs={9}>
											<TextField
												labelId='sellingPrice'
												name='unitSellingPrice'
												label='Selling Price(Unit)'
												size='small'
												value={unitSellingPrice}
												onChange={(e) => onChange(e)}
												required
											/>
										</Grid>
										<Grid item xs={3}>
											<InputLabel
												id='sellingPrice'
												shrink={true}
												style={{ marginTop: '1.5rem' }}
											>
												LKR
											</InputLabel>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid container direction='row' style={{ marginTop: '0.5rem' }}>
								<Grid item xs={6}>
									<TextField
										type='number'
										name='quantity'
										label='Quantity'
										size='small'
										value={quantity}
										onChange={(e) => onChange(e)}
										style={{ marginTop: '0.5rem' }}
										required
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										type='number'
										name='bufferQty'
										label='Buffer Quantity'
										size='small'
										value={bufferQty}
										onChange={(e) => onChange(e)}
										style={{ marginTop: '0.5rem' }}
										required
									/>
								</Grid>
							</Grid>
							<Grid container direction='row' style={{ marginTop: '0.5rem' }}>
								<Grid item xs={6}>
									<TextField
										type='date'
										size='small'
										name='purchasedDate'
										label='Purchased Date'
										value={purchasedDate}
										onChange={(e) => onChange(e)}
										style={{ marginTop: '0.5rem' }}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										type='date'
										size='small'
										name='manufactureDate'
										label='Manufacture Date'
										value={manufactureDate}
										onChange={(e) => onChange(e)}
										style={{ marginTop: '0.5rem' }}
									/>
								</Grid>
							</Grid>
							<Grid container direction='row' style={{ marginTop: '0.5rem' }}>
								<Grid item xs={6}>
									<TextField
										type='date'
										size='small'
										name='expireDate'
										label='Expire Date'
										value={expireDate}
										onChange={(e) => onChange(e)}
										style={{ marginTop: '0.5rem' }}
										required
									/>
								</Grid>
								<Grid item xs={6}>
									<Grid
										container
										direction='row'
										style={{ marginTop: '0.5rem' }}
									>
										<Grid item xs={8}>
											<TextField
												labelId='notify'
												name='notifyBefore'
												label='Notify Before'
												size='small'
												value={notifyBefore}
												onChange={(e) => onChange(e)}
												required
											/>
										</Grid>
										<Grid item xs={4}>
											<InputLabel
												id='notify'
												shrink={true}
												style={{ marginTop: '1.5rem' }}
											>
												Day(s)
											</InputLabel>
										</Grid>
									</Grid>
								</Grid>
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
}

export default AddItem;
