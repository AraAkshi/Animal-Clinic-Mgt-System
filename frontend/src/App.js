import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/layout/Homepage';
import Login from './components/Login';
import Register from './components/Register';
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

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Homepage} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/admin/dashboard' component={Dashboard} />
				<Route exact path='/admin/appointments' component={Appointment} />
				<Route
					exact
					path='/admin/appointments/add-appointment'
					component={AddAppointment}
				/>
				<Route exact path='/admin/animals' component={Animal} />
				<Route exact path='/admin/animals/add-animal' component={AddAnimal} />
				<Route exact path='/admin/treatments' component={Treatment} />
				<Route
					exact
					path='/admin/treatments/add-treatment'
					component={AddTreatment}
				/>
				<Route exact path='/admin/inventory' component={Inventory} />
				<Route exact path='/admin/inventory/add-item' component={AddItem} />
				<Route exact path='/admin/inventory/sell-item' component={SellItem} />
				<Route exact path='/admin/reports' component={Report} />
				<Route exact path='/admin/employees' component={Employee} />
				<Route
					exact
					path='/admin/employees/add-employee'
					component={AddEmployee}
				/>
				<Route exact path='/admin/customers' component={Customer} />
				<Route
					exact
					path='/admin/customers/add-customer'
					component={AddCustomer}
				/>
			</Switch>
		</Router>
	);
}

export default App;
