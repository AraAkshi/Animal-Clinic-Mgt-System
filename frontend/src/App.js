import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/client/layout/Homepage';
import Login from './components/client/Login';
import Register from './components/client/Register';
import Dashboard from './components/admin/pages/dashboard/Dashboard';
import Appointment from './components/admin/pages/appointments/Appointment';
import AddAppointment from './components/admin/pages/appointments/AddAppointment';
import Animal from './components/admin/pages/animals/Animal';
import AddAnimal from './components/admin/pages/animals/AddAnimal';
import Treatment from './components/admin/pages/treatments/Treatment';
import Inventory from './components/admin/pages/inventory/Inventory';
import Report from './components/admin/pages/report/Report';
import Employee from './components/admin/pages/employee/Employee';
import Customer from './components/admin/pages/customer/Customer';
import AddCustomer from './components/admin/pages/customer/AddCustomer';
import AddEmployee from './components/admin/pages/employee/AddEmployee';
import AddItem from './components/admin/pages/inventory/AddItem';
import SellItem from './components/admin/pages/inventory/SellItem';
import AddTreatment from './components/admin/pages/treatments/AddTreatment';
import ClientAppointment from './components/client/appointments/ClientAppointment';
import ClientPrivateRoute from './components/routing/ClientPrivateRoute';
import EmpPrivateRoute from './components/routing/EmpPrivateRoute';
import AdminPrivateRoute from './components/routing/AdminPrivateRoute';
import Forbidden from './components/common/forbidden';
import ClientProfile from './components/client/profile/ClientProfile';
import ChangePassword from './components/client/profile/ChangePassword';

function App() {
	return (
		<Router>
			<Switch>
				{/* Public Accessible Routes Routes */}
				<Route exact path='/' component={Homepage} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/access-denied' component={Forbidden} />

				{/* Client Private Routes */}
				<ClientPrivateRoute
					exact
					path='/client/appointments'
					component={ClientAppointment}
				/>
				<ClientPrivateRoute
					exact
					path='/my-profile'
					component={ClientProfile}
				/>
				<ClientPrivateRoute
					exact
					path='/my-profile/change-password'
					component={ChangePassword}
				/>

				{/* Employee Private Routes */}
				<EmpPrivateRoute exact path='/admin/dashboard' component={Dashboard} />
				<EmpPrivateRoute
					exact
					path='/admin/appointments'
					component={Appointment}
				/>
				<EmpPrivateRoute
					exact
					path='/admin/appointments/add-appointment'
					component={AddAppointment}
				/>
				<EmpPrivateRoute exact path='/admin/animals' component={Animal} />
				<EmpPrivateRoute
					exact
					path='/admin/animals/add-animal'
					component={AddAnimal}
				/>
				<EmpPrivateRoute exact path='/admin/treatments' component={Treatment} />
				<EmpPrivateRoute
					exact
					path='/admin/treatments/add-treatment'
					component={AddTreatment}
				/>
				<EmpPrivateRoute exact path='/admin/inventory' component={Inventory} />
				<EmpPrivateRoute
					exact
					path='/admin/inventory/add-item'
					component={AddItem}
				/>
				<EmpPrivateRoute
					exact
					path='/admin/inventory/sell-item'
					component={SellItem}
				/>
				<EmpPrivateRoute exact path='/admin/customers' component={Customer} />
				<EmpPrivateRoute
					exact
					path='/admin/customers/add-customer'
					component={AddCustomer}
				/>

				{/* Admin Private Routes */}
				<AdminPrivateRoute exact path='/admin/reports' component={Report} />
				<AdminPrivateRoute exact path='/admin/employees' component={Employee} />
				<AdminPrivateRoute
					exact
					path='/admin/employees/add-employee'
					component={AddEmployee}
				/>
			</Switch>
		</Router>
	);
}

export default App;
