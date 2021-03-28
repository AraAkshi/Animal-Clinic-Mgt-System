import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Grid, Modal, Backdrop } from '@material-ui/core';
import { formatDate } from '../../../../services/appointment';
import { deleteEmployee } from '../../../../services/employee';
import EditEmployee from './EditEmployee';

function EmployeeDetails(props) {
	const { selectedEmployee, setAlert } = props;
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = async () => {
		setOpen(true);
	};

	const handleDelete = async () => {
		const res = await deleteEmployee(selectedEmployee.id);
		if (res !== undefined) {
			const newAlert = {
				msg: 'Employee Details Deleted Successfully',
				alertType: 'warning',
				state: true,
			};
			setAlert({ ...alert, newAlert });
			window.open(window.location.origin + `/admin/employees`, '_self');
		}
	};

	return (
		<div>
			<div className='detailCard'>
				<div className='detailCardHeader'>EMPLOYEE DETAILS</div>
				<Grid container direction='column'>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={6}>
								<div className='detailCardItem'>NAME</div>
							</Grid>
							<Grid item xs={6}>
								<div className='detailCardValue'>
									{selectedEmployee.name.toUpperCase()}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={6}>
								<div className='detailCardItem'>NIC</div>
							</Grid>
							<Grid item xs={6}>
								<div className='detailCardValue'>{selectedEmployee.nic}</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={6}>
								<div className='detailCardItem'>DESIGNATION</div>
							</Grid>
							<Grid item xs={6}>
								<div className='detailCardValue'>
									{selectedEmployee.designation}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={6}>
								<div className='detailCardItem'>EPF NO</div>
							</Grid>
							<Grid item xs={6}>
								<div className='detailCardValue'>
									{selectedEmployee.epfNo !== 0 ? selectedEmployee.epfNo : ''}
								</div>
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
									{selectedEmployee.contact !== 0
										? selectedEmployee.contact
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
								<div className='detailCardValue'>{selectedEmployee.email}</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={6}>
								<div className='detailCardItem'>ADDRESS</div>
							</Grid>
							<Grid item xs={6}>
								<div className='detailCardValue'>
									{selectedEmployee.address.toUpperCase()}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={6}>
								<div className='detailCardItem'>JOINED DATE</div>
							</Grid>
							<Grid item xs={6}>
								<div className='detailCardValue'>
									{selectedEmployee.joinedDate !== ''
										? formatDate(selectedEmployee.joinedDate)
										: selectedEmployee.joinedDate}
								</div>
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
									{selectedEmployee.enteredDate !== ''
										? formatDate(selectedEmployee.enteredDate)
										: selectedEmployee.enteredDate}
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
									{selectedEmployee.remarks}
								</div>
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
							style={{
								visibility:
									localStorage.userRole === 'admin' ? 'visible' : 'hidden',
								fontSize: '0.9vw',
							}}
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
				<EditEmployee
					selectedEmployee={selectedEmployee}
					setAlert={setAlert}
					setOpen={setOpen}
				/>
			</Modal>
		</div>
	);
}

export default EmployeeDetails;
