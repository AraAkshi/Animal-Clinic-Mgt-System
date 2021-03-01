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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Alerts from '../../../layout/Alerts';
import { getAllItems, getCategoryItems } from '../../../../services/inventory';
import { getAllCategories } from '../../../../services/productCategory';
import CategoryBtn from './CategoryBtn';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

function Inventory() {
	const [alert, setAlert] = useState([
		{ msg: '', alertType: '', state: false },
	]);
	const [categories, setCategories] = useState([
		{ id: 0, name: '', imagePath: '' },
	]);
	const [items, setItems] = useState([
		{
			id: 0,
			isEmpty: false,
			name: '',
			category: { id: 0, name: '', imagePath: '' },
			brand: '',
			unitPurchasePrice: 0,
			bufferQty: 0,
			quantity: 0,
			unitSellingPrice: 0,
			purchasedDate: '',
			manufactureDate: '',
			expireDate: '',
			notifyBefore: 0,
			batchNo: 0,
			addedDate: '',
		},
	]);

	const [selectedItem, setSelectedItem] = useState({
		id: 0,
		isEmpty: false,
		name: '',
		category: { id: 0, name: '', imagePath: '' },
		brand: '',
		unitPurchasePrice: 0,
		bufferQty: 0,
		quantity: 0,
		unitSellingPrice: 0,
		purchasedDate: '',
		manufactureDate: '',
		expireDate: '',
		notifyBefore: 0,
		batchNo: 0,
		addedDate: '',
	});

	const addInventory = () => {
		window.open(window.location.origin + '/admin/inventory/add-item', '_self');
	};

	const handleRowSelect = (item) => {
		setSelectedItem(item);
	};

	useEffect(() => {
		async function fetchData() {
			const categoryRes = await getAllCategories();
			const itemRes = await getAllItems();
			if (itemRes !== undefined && categoryRes !== undefined) {
				setCategories(categoryRes);
				setItems(itemRes);
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
						<Grid
							container
							direction='row'
							alignContent='center'
							justify='space-evenly'
						>
							<Grid item>
								<Typography variant='body1' style={{ paddingTop: '0.81rem' }}>
									Total Items
								</Typography>
							</Grid>
							{categories.map((item) => (
								<Grid item>
									<CategoryBtn category={item} />
								</Grid>
							))}
						</Grid>
					</Grid>
					<Grid item>
						<Button
							size='small'
							color='secondary'
							startIcon={<AddIcon />}
							onClick={addInventory}
							variant='contained'
							style={{ margin: '0.5rem' }}
						>
							New Item
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
										<StyledTableCell>Category</StyledTableCell>
										<StyledTableCell>Batch No</StyledTableCell>
										<StyledTableCell>Name</StyledTableCell>
										<StyledTableCell>Brand</StyledTableCell>
										<StyledTableCell>Quantity</StyledTableCell>
										<StyledTableCell>Manufacture Date</StyledTableCell>
										<StyledTableCell>Expire Date</StyledTableCell>
										<StyledTableCell>Purchased Date</StyledTableCell>
										<StyledTableCell>Price</StyledTableCell>
										{localStorage.userRole === 'admin' ? (
											<StyledTableCell></StyledTableCell>
										) : (
											''
										)}
									</TableRow>
								</TableHead>
								<TableBody>
									{items.length > 0 ? (
										items.map((item) => (
											<TableRow
												hover={true}
												onClick={() => handleRowSelect(item)}
												style={{ cursor: 'pointer' }}
											>
												<StyledTableCell>{item.category.name}</StyledTableCell>
												<StyledTableCell>{item.batchNo}</StyledTableCell>
												<StyledTableCell>{item.name}</StyledTableCell>
												<StyledTableCell>{item.brand}</StyledTableCell>
												<StyledTableCell>{item.quantity}</StyledTableCell>
												<StyledTableCell>
													{item.manufactureDate}
												</StyledTableCell>
												<StyledTableCell>{item.expireDate}</StyledTableCell>
												<StyledTableCell>{item.purchasedDate}</StyledTableCell>
												<StyledTableCell>
													{item.unitSellingPrice}
												</StyledTableCell>
												{localStorage.userRole === 'admin' ? (
													<StyledTableCell>
														<EditIcon fontSize='small' />{' '}
														<DeleteIcon fontSize='small' />
													</StyledTableCell>
												) : (
													''
												)}
											</TableRow>
										))
									) : (
										<TableRow>
											<StyledTableCell>No Items Available</StyledTableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default Inventory;
