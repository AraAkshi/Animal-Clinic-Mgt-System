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
import Alerts from '../../../layout/Alerts';
import { getAllEmployees } from '../../../../services/employee';
import EmployeeDetails from './EmployeeDetails';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 13,
	},
}))(TableCell);

function Employee() {
	const [alert, setAlert] = useState([
		{ msg: '', alertType: '', state: false },
	]);
	const [employees, setEmployees] = useState([
		{
			id: 0,
			isActive: true,
			nic: '',
			name: '',
			email: '',
			address: '',
			designation: '',
			epfNo: 0,
			contact: 0,
			joinedDate: '',
			enteredDate: '',
		},
	]);

	const [selectedEmployee, setSelectedEmployee] = useState({
		id: 0,
		isActive: true,
		nic: '',
		name: '',
		email: '',
		address: '',
		designation: '',
		epfNo: 0,
		contact: 0,
		joinedDate: '',
		enteredDate: '',
	});

	const addEmployee = () => {
		window.open(
			window.location.origin + '/admin/employees/add-employee',
			'_self'
		);
	};

	const handleRowSelect = (item) => {
		setSelectedEmployee(item);
	};

	useEffect(() => {
		async function fetchData() {
			const res = await getAllEmployees();
			if (res !== undefined) {
				const activeEmps = res.filter((item) => item.isActive === true);
				setEmployees(activeEmps);
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
						<Grid container direction='row' alignContent='center'>
							<Grid item>
								<Typography variant='body1' style={{ paddingTop: '0.81rem' }}>
									Total Active Employees
								</Typography>
							</Grid>
							<Grid item>
								<div className='petStatCard'>{employees.length}</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Button
							size='small'
							color='secondary'
							startIcon={<AddIcon />}
							onClick={addEmployee}
							variant='contained'
							style={{ margin: '0.5rem' }}
						>
							New Employee
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
										<StyledTableCell>Name</StyledTableCell>
										<StyledTableCell>Contact</StyledTableCell>
										<StyledTableCell>Email</StyledTableCell>
										<StyledTableCell>EPF No</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{employees.length > 0 ? (
										employees.map((item) => (
											<TableRow
												hover={true}
												onClick={() => handleRowSelect(item)}
												style={{ cursor: 'pointer' }}
											>
												<StyledTableCell>
													{item.name.toUpperCase()}
												</StyledTableCell>
												<StyledTableCell>{item.contact}</StyledTableCell>
												<StyledTableCell>{item.email}</StyledTableCell>
												<StyledTableCell>{item.epfNo}</StyledTableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<StyledTableCell>No Employees</StyledTableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={5}>
						<EmployeeDetails
							selectedEmployee={selectedEmployee}
							setAlert={setAlert}
						/>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default Employee;
