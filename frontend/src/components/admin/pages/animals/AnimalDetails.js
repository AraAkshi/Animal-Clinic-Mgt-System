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
import { formatDate } from '../../../../services/appointment';
import { getAllTypes } from '../../../../services/petType';
import { getAllCustomers } from '../../../../services/customer';
import { deleteAnimal } from '../../../../services/animal';
import EditAnimal from './EditAnimal';

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

function AnimalDetails(props) {
	const { selectedAnimal, setAlert, treatments } = props;
	const [open, setOpen] = useState(false);
	const [petTypes, setPetTypes] = useState([{ id: 0, name: '' }]);
	const [customers, setCustomers] = useState([]);

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = async () => {
		const cusRes = await getAllCustomers();
		const typesRes = await getAllTypes();
		setCustomers(cusRes);
		setPetTypes(typesRes);
		setOpen(true);
	};

	const handleDelete = async () => {
		const res = await deleteAnimal(selectedAnimal.id);
		if (res !== undefined) {
			const newAlert = {
				msg: 'Animal Details Deleted Successfully',
				alertType: 'warning',
				state: true,
			};
			setAlert({ ...alert, newAlert });
			window.open(window.location.origin + `/admin/animals`, '_self');
		}
	};

	return (
		<div>
			<div className='detailCard'>
				<div className='detailCardHeader'>ANIMAL DETAILS</div>
				<Grid container direction='column'>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={7}>
								<div className='detailCardItem'>NAME</div>
							</Grid>
							<Grid item xs={5}>
								<div className='detailCardValue'>{selectedAnimal.name}</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={7}>
								<div className='detailCardItem'>GENDER</div>
							</Grid>
							<Grid item xs={5}>
								<div className='detailCardValue'>{selectedAnimal.gender}</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={7}>
								<div className='detailCardItem'>BLOOD GROUP</div>
							</Grid>
							<Grid item xs={5}>
								<div className='detailCardValue'>
									{selectedAnimal.bloodGroup}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={7}>
								<div className='detailCardItem'>DATE OF BIRTH</div>
							</Grid>
							<Grid item xs={5}>
								<div className='detailCardValue'>
									{selectedAnimal.dateOfBirth !== ''
										? formatDate(selectedAnimal.dateOfBirth)
										: selectedAnimal.dateOfBirth}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={7}>
								<div className='detailCardItem'>BREED</div>
							</Grid>
							<Grid item xs={5}>
								<div className='detailCardValue'>{selectedAnimal.breed}</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={7}>
								<div className='detailCardItem'>TYPE</div>
							</Grid>
							<Grid item xs={5}>
								<div className='detailCardValue'>
									{selectedAnimal.type.name}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={7}>
								<div className='detailCardItem'>OWNER NAME</div>
							</Grid>
							<Grid item xs={5}>
								<div className='detailCardValue'>
									{selectedAnimal.owner.name}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={7}>
								<div className='detailCardItem'>OWNER CONTACT</div>
							</Grid>
							<Grid item xs={5}>
								<div className='detailCardValue'>
									{selectedAnimal.owner.contact.toString()}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={7}>
								<div className='detailCardItem'>ADDED DATE</div>
							</Grid>
							<Grid item xs={5}>
								<div className='detailCardValue'>
									{selectedAnimal.enteredDate !== ''
										? formatDate(selectedAnimal.enteredDate)
										: selectedAnimal.enteredDate}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={7}>
								<div className='detailCardItem'>REMARKS</div>
							</Grid>
							<Grid item xs={5}>
								<div className='detailCardValue'>{selectedAnimal.remarks}</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>TREATMENTS DONE</div>
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
											{treatments.length > 0 ? (
												treatments.map((item) => (
													<TableRow key={item.id}>
														<StyledTableCell>
															{formatDate(item.dateReceived)}
														</StyledTableCell>
														<StyledTableCell>
															{item.treatmentType}
														</StyledTableCell>
														<StyledTableCell>
															{item.description}
														</StyledTableCell>
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
				<EditAnimal
					petTypes={petTypes}
					customers={customers}
					selectedAnimal={selectedAnimal}
					setAlert={setAlert}
					setOpen={setOpen}
				/>
			</Modal>
		</div>
	);
}

export default AnimalDetails;
