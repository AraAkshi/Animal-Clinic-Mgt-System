import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { getCusAnimals } from '../../../services/animal';
import {
	getAllAppointments,
	getCusAppointment,
	isDateDue,
} from '../../../services/appointment';
import { getCustomerByEmail } from '../../../services/customer';
import Alerts from '../layout/Alerts';
import Navbar from '../layout/Navbar';
import ClientAppointmentDetails from '../appointments/ClientAppointmentDetails';
import ClientDetails from './ClientDetails';
import { getCustomerTreatments } from '../../../services/treatment';

function ClientProfile() {
	const [alert, setAlert] = useState([]);
	const [customer, setCustomer] = useState();
	const [animals, setAnimals] = useState([]);
	const [appointmentsDue, setAppointmentsDue] = useState([]);
	const [appointmentsDone, setAppointmentsDone] = useState([]);
	const [treatmentsDue, setTreatmentsDue] = useState([]);
	const [allAppointments, setAllAppointments] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const customerRes = await getCustomerByEmail(localStorage.email);
			if (customerRes !== undefined) {
				setCustomer(customerRes);
				const animalRes = await getCusAnimals(customerRes.id);
				if (animalRes !== undefined) setAnimals(animalRes);

				//Get Appointment Details
				const appRes = await getCusAppointment(customerRes.id);
				if (appRes !== undefined) {
					//Due Appointments
					const dueApps = appRes.filter((item) => item.isAttended !== true);
					setAppointmentsDue(dueApps);

					//Completed Appointments
					const doneApps = appRes.filter((item) => item.isAttended === true);
					setAppointmentsDone(doneApps);
				}

				//Get Treatment Details
				const treatmentRes = await getCustomerTreatments(customerRes.id);
				const dueTreats = treatmentRes.filter((item) =>
					isDateDue(item.nextTreatmentDate)
				);
				setTreatmentsDue(dueTreats);
			}

			const allAppRes = await getAllAppointments();
			if (allAppRes !== undefined) setAllAppointments(allAppRes);
		}
		fetchData();
	}, [0]);

	return (
		<div>
			<Alerts alerts={alert} />
			<Navbar />
			<div className='bg-image'>
				<div className='container'>
					<div className='container-header'>MY DETAILS</div>
					<Grid container direction='row' spacing={1} justify='center'>
						<Grid item xs={5}>
							<ClientDetails customer={customer} animals={animals} />
						</Grid>
						<Grid item xs={7}>
							<ClientAppointmentDetails
								appointmentsDue={appointmentsDue}
								appointmentsDone={appointmentsDone}
								setAlert={setAlert}
								animals={animals}
								allAppointments={allAppointments}
								treatmentsDue={treatmentsDue}
							/>
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
	);
}

export default ClientProfile;
