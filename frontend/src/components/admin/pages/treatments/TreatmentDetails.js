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
import { deleteTreatment } from '../../../../services/treatment';
import EditTreatment from './EditTreatment';

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

function TreatmentDetails(props) {
	const { selectedTreatment, setAlert, customers, items } = props;
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = async () => {
		setOpen(true);
	};

	const handleDelete = async () => {
		const res = await deleteTreatment(selectedTreatment.id);
		if (res !== undefined) {
			const newAlert = {
				msg: 'Treatment Details Deleted Successfully',
				alertType: 'warning',
				state: true,
			};
			setAlert({ ...alert, newAlert });
			window.open(window.location.origin + `/admin/treatments`, '_self');
		}
	};

	return (
		<div>
			<div className='detailCard'>
				<div className='detailCardHeader'>TREATMENT DETAILS</div>
				<Grid container direction='column'>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>DATE</div>
							</Grid>
							<Grid item xs={7}>
								<div className='detailCardValue'>
									{selectedTreatment.dateReceived !== ''
										? formatDate(selectedTreatment.dateReceived)
										: selectedTreatment.dateReceived}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>TIME</div>
							</Grid>
							<Grid item xs={7}>
								<div className='detailCardValue'>
									{selectedTreatment.timeReceived}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>TREATMENT TYPE</div>
							</Grid>
							<Grid item xs={7}>
								<div className='detailCardValue'>
									{selectedTreatment.treatmentType}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>DESCRIPTION</div>
							</Grid>
							<Grid item xs={7}>
								<div className='detailCardValue'>
									{selectedTreatment.description}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>CUSTOMER</div>
							</Grid>
							<Grid item xs={7}>
								<div className='detailCardValue'>
									{`${selectedTreatment.customer.name} - ${selectedTreatment.customer.contact}`}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>ANIMAL</div>
							</Grid>
							<Grid item xs={7}>
								<div className='detailCardValue'>
									{`${selectedTreatment.animal.name} - ${selectedTreatment.animal.breed}`}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>NEXT TREATMENT DATE</div>
							</Grid>
							<Grid item xs={7}>
								<div className='detailCardValue'>
									{selectedTreatment.nextTreatmentDate !== ''
										? formatDate(selectedTreatment.nextTreatmentDate)
										: selectedTreatment.nextTreatmentDate}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={5}>
								<div className='detailCardItem'>ITEMS USED</div>
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
											{selectedTreatment.itemsUsed.length > 0 ? (
												selectedTreatment.itemsUsed.map((item) => (
													<TableRow key={item.id}>
														<StyledTableCell>{item.name}</StyledTableCell>
														<StyledTableCell>{item.newSales}</StyledTableCell>
													</TableRow>
												))
											) : (
												<TableRow>
													<StyledTableCell>No Items Used</StyledTableCell>
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
				<EditTreatment
					selectedTreatment={selectedTreatment}
					setAlert={setAlert}
					setOpen={setOpen}
					customers={customers}
					items={items}
				/>
			</Modal>
		</div>
	);
}

export default TreatmentDetails;
