import React from 'react';
import {
	Grid,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableContainer,
	withStyles,
} from '@material-ui/core';
import { formatDate } from '../../../services/appointment';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 12,
	},
}))(TableCell);

function ClientAnimalDetails(props) {
	const { selectedAnimal, treatments } = props;

	return (
		<div className='detailCard'>
			<div className='detailCardHeader'>ANIMAL DETAILS</div>
			<Grid container direction='column'>
				<Grid item>
					<Grid container direction='row'>
						<Grid item xs={4}>
							<div className='detailCardItem'>NAME</div>
						</Grid>
						<Grid item xs={5}>
							<div className='detailCardValue'>{selectedAnimal.name}</div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction='row'>
						<Grid item xs={4}>
							<div className='detailCardItem'>GENDER</div>
						</Grid>
						<Grid item xs={5}>
							<div className='detailCardValue'>{selectedAnimal.gender}</div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction='row'>
						<Grid item xs={4}>
							<div className='detailCardItem'>BLOOD GROUP</div>
						</Grid>
						<Grid item xs={5}>
							<div className='detailCardValue'>{selectedAnimal.bloodGroup}</div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction='row'>
						<Grid item xs={4}>
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
						<Grid item xs={4}>
							<div className='detailCardItem'>BREED</div>
						</Grid>
						<Grid item xs={5}>
							<div className='detailCardValue'>{selectedAnimal.breed}</div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction='row'>
						<Grid item xs={4}>
							<div className='detailCardItem'>TYPE</div>
						</Grid>
						<Grid item xs={5}>
							<div className='detailCardValue'>{selectedAnimal.type.name}</div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction='row'>
						<Grid item xs={5}>
							<div className='detailCardItem'>TREATMENTS DONE</div>
						</Grid>
						<Grid item xs={4}>
							<div className='detailCardValue'></div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction='row' justify='center'>
						<Grid item xs={10}>
							<TableContainer style={{ maxHeight: '40vh', overflowY: 'auto' }}>
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
													<StyledTableCell>{item.description}</StyledTableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<StyledTableCell>No Treatments</StyledTableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default ClientAnimalDetails;
