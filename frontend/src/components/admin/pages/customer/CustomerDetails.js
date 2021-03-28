import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
	Button,
	Grid,
	Modal,
	Backdrop,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableContainer,
	withStyles,
} from '@material-ui/core';
import { deleteCustomer } from '../../../../services/customer';
import { formatDate } from '../../../../services/appointment';
import EditCustomer from './EditCustomer';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 11,
		fontWeight: 'bold',
	},
}))(TableCell);

function CustomerDetails(props) {
	const { selectedCustomer, setAlert, customerAnimals } = props;
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = async () => {
		setOpen(true);
	};

	const handleDelete = async () => {
		const res = await deleteCustomer(selectedCustomer.id);
		if (res !== undefined) {
			const newAlert = {
				msg: 'Customer Details Deleted Successfully',
				alertType: 'warning',
				state: true,
			};
			setAlert({ ...alert, newAlert });
			window.open(window.location.origin + `/admin/customers`, '_self');
		}
	};

	return (
		<div>
			<div className='detailCard'>
				<div className='detailCardHeader'>CUSTOMER DETAILS</div>
				<Grid container direction='column'>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={6}>
								<div className='detailCardItem'>NAME</div>
							</Grid>
							<Grid item xs={6}>
								<div className='detailCardValue'>{selectedCustomer.name}</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={6}>
								<div className='detailCardItem'>CONTACT</div>
							</Grid>
							<Grid item xs={6}>
								<div className='detailCardValue'>
									{selectedCustomer.contact !== 0
										? selectedCustomer.contact
										: ''}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={6}>
								<div className='detailCardItem'>EMAIL</div>
							</Grid>
							<Grid item xs={6}>
								<div className='detailCardValue'>{selectedCustomer.email}</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={6}>
								<div className='detailCardItem'>ADDED DATE</div>
							</Grid>
							<Grid item xs={6}>
								<div className='detailCardValue'>
									{selectedCustomer.enteredDate !== ''
										? formatDate(selectedCustomer.enteredDate)
										: selectedCustomer.enteredDate}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={6}>
								<div className='detailCardItem'>REMARKS</div>
							</Grid>
							<Grid item xs={6}>
								<div className='detailCardValue'>
									{selectedCustomer.remarks}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>PETS OWNED</div>
							</Grid>
							<Grid item xs={7}>
								<div className='detailCardValue'></div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row' justify='center'>
							<Grid item xs={10}>
								<TableContainer>
									<Table size='small' stickyHeader>
										<TableBody>
											{customerAnimals.length > 0 ? (
												customerAnimals.map((item) => (
													<TableRow key={item.id}>
														<StyledTableCell>{item.name}</StyledTableCell>
														<StyledTableCell>{item.breed}</StyledTableCell>
													</TableRow>
												))
											) : (
												<TableRow>
													<StyledTableCell>No Pets</StyledTableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</TableContainer>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<div style={{ marginTop: '1.5rem' }}>
					<Grid container direction='row' justify='space-evenly'>
						<Button
							startIcon={<EditIcon fontSize='small' />}
							size='small'
							color='secondary'
							variant='contained'
							style={{ fontSize: '0.9vw' }}
							onClick={handleEdit}
						>
							Edit
						</Button>
						<Button
							variant='contained'
							size='small'
							color='secondary'
							startIcon={<DeleteIcon fontSize='small' />}
							style={{
								visibility:
									localStorage.userRole === 'admin' ? 'visible' : 'hidden',
								fontSize: '0.9vw',
							}}
							onClick={handleDelete}
						>
							Delete
						</Button>
					</Grid>
				</div>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				style={{ height: '90vh', width: '40vw', margin: 'auto' }}
				BackdropComponent={Backdrop}
			>
				<EditCustomer
					selectedCustomer={selectedCustomer}
					setAlert={setAlert}
					setOpen={setOpen}
				/>
			</Modal>
		</div>
	);
}

export default CustomerDetails;
