import { Button, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';
import EditIcon from '@material-ui/icons/Edit';
import { getOneEmployee } from '../../../../services/employee';
import { formatDate } from '../../../../services/appointment';

function UserProfile() {
	const [details, setDetails] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const res = await getOneEmployee(localStorage.email);
			if (res !== undefined) setDetails(res);
		}
	}, []);

	return (
		<div>
			<Header />
			<Sidebar />
			<div className='sidebar-container'>
				<div className='container-header'>MY PROFILE DETAILS</div>
				<Grid container direction='column'>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={6}>
								<div className='detailCardItem'>NAME</div>
							</Grid>
							<Grid item xs={6}>
								<div className='detailCardValue'>
									{details.name.toUpperCase()}
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
								<div className='detailCardValue'>{details.nic}</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='row'>
							<Grid item xs={6}>
								<div className='detailCardItem'>DESIGNATION</div>
							</Grid>
							<Grid item xs={6}>
								<div className='detailCardValue'>{details.designation}</div>
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
									{details.epfNo !== 0 ? details.epfNo : ''}
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
									{details.contact !== 0 ? details.contact : ''}
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
								<div className='detailCardValue'>{details.email}</div>
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
									{details.address.toUpperCase()}
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
									{details.joinedDate !== ''
										? formatDate(details.joinedDate)
										: details.joinedDate}
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Button
							startIcon={<EditIcon fontSize='small' />}
							size='small'
							color='secondary'
							variant='contained'
							style={{ fontSize: '0.9vw' }}
							href='/admin/change-password'
						>
							Edit
						</Button>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default UserProfile;
