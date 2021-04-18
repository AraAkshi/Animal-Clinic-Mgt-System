import React, { Fragment, useState } from 'react';
import {
	Grid,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableContainer,
	withStyles,
	Button,
	Modal,
	Backdrop,
} from '@material-ui/core';
import { formatDate } from '../../../services/appointment';
import { getAnimalTreatments } from '../../../services/treatment';
import ClientAnimalDetails from './ClientAnimalDetails';
import { changePassword } from '../../../services/auth';

const StyledTableCell = withStyles(() => ({
	body: {
		fontSize: 12,
		fontWeight: 'bold',
	},
}))(TableCell);

function ClientDetails(props) {
	const { customer, animals } = props;
	const [animalModalOpen, setAnimalModalOpen] = useState(false);
	const [selectedAnimal, setSelectedAnimal] = useState();
	const [treatments, setTreatments] = useState([]);

	//view Selected Animal Details
	const handleAnimalSelect = async (animal) => {
		setSelectedAnimal(animal);

		//Get Animal Treatment Details
		const res = await getAnimalTreatments(animal.id);
		if (res !== undefined) setTreatments(res);

		setAnimalModalOpen(true);
	};

	const handleModalClose = () => {
		setAnimalModalOpen(false);
	};

	//Change Password
	const changeMyPw = () => {
		window.open('/my-profile/change-password', '_self');
	};

	return (
		<Fragment>
			<Grid
				container
				direction='column'
				style={{
					fontSize: '1.1vw',
					fontFamily: 'Arial, Helvetica, sans-serif',
				}}
				spacing={1}
			>
				<Grid item>
					<Grid container direction='row'>
						<Grid item xs={6}>
							<div className='detailCardItem'>NAME</div>
						</Grid>
						<Grid item xs={6}>
							<div className='detailCardValue'>
								{customer !== undefined ? customer.name : ''}
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
								{customer !== undefined
									? customer.contact !== 0
										? customer.contact
										: ''
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
							<div className='detailCardValue'>
								{customer !== undefined ? customer.email : ''}
							</div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction='row'>
						<Grid item xs={6}>
							<div className='detailCardItem'>JOINED ON</div>
						</Grid>
						<Grid item xs={6}>
							<div className='detailCardValue'>
								{customer !== undefined
									? customer.enteredDate !== ''
										? formatDate(customer.enteredDate)
										: customer.enteredDate
									: ''}
							</div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction='row'>
						<Grid item xs={6}>
							<div className='detailCardItem'>PETS OWNED</div>
						</Grid>
						<Grid item xs={6}>
							<div className='detailCardValue'></div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid
						container
						direction='row'
						justify='flex-start'
						style={{ marginTop: '-1.5rem', marginLeft: '1.5rem' }}
					>
						<Grid item xs={10}>
							<TableContainer style={{ maxHeight: '40vh', overflowY: 'auto' }}>
								<Table size='small' stickyHeader>
									<TableBody>
										{animals.length > 0 ? (
											animals.map((item) => (
												<TableRow key={item.id}>
													<StyledTableCell>{item.name}</StyledTableCell>
													<StyledTableCell>{item.breed}</StyledTableCell>
													<StyledTableCell>
														<Button
															size='small'
															style={{
																textDecoration: 'underline',
																textTransform: 'capitalize',
															}}
															onClick={() => handleAnimalSelect(item)}
														>
															More Details&gt;&gt;
														</Button>
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
				<Button
					size='small'
					variant='contained'
					color='secondary'
					onClick={changeMyPw}
					style={{ width: '13vw', fontSize: '0.9vw', marginLeft: '1rem' }}
				>
					Change My password
				</Button>
			</Grid>
			<Modal
				open={animalModalOpen}
				onClose={handleModalClose}
				style={{ height: '90vh', width: '60vw', margin: 'auto' }}
				BackdropComponent={Backdrop}
			>
				<ClientAnimalDetails
					selectedAnimal={selectedAnimal}
					treatments={treatments}
				/>
			</Modal>
		</Fragment>
	);
}

export default ClientDetails;
