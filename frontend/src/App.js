import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/layout/Homepage';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/admin/pages/Dashboard';
import Appointment from './components/admin/pages/appointments/Appointment';
<<<<<<< HEAD
import Animal from './components/admin/pages/animals/Animal';
=======
import AddAppointment from './components/admin/pages/appointments/AddAppointment';
import Animal from './components/admin/pages/animals/Animal';
import AddAnimal from './components/admin/pages/animals/AddAnimal';
>>>>>>> 441b5e3362614f46559f321e9429d4c7a627001d
import Reminder from './components/admin/pages/Reminder';
import Inventory from './components/admin/pages/Inventory';
import Report from './components/admin/pages/Report';
import Employee from './components/admin/pages/Employee';
import Customer from './components/admin/pages/Customer';

function App() {
<<<<<<< HEAD
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path='/' component={Homepage} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/admin/dashboard' component={Dashboard} />
					<Route exact path='/admin/appointments' component={Appointment} />
					<Route exact path='/admin/animals' component={Animal} />
					<Route exact path='/admin/reminders' component={Reminder} />
					<Route exact path='/admin/inventory' component={Inventory} />
					<Route exact path='/admin/reports' component={Report} />
					<Route exact path='/admin/employees' component={Employee} />
					<Route exact path='/admin/customers' component={Customer} />
				</Switch>
			</Router>
		</Provider>
	);
=======
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/admin/appointments" component={Appointment} />
          <Route
            exact
            path="/admin/appointments/add-appointment"
            component={AddAppointment}
          />
          <Route exact path="/admin/animals" component={Animal} />
          <Route exact path="/admin/animals/add-animal" component={AddAnimal} />
          <Route exact path="/admin/reminders" component={Reminder} />
          <Route exact path="/admin/inventory" component={Inventory} />
          <Route exact path="/admin/reports" component={Report} />
          <Route exact path="/admin/employees" component={Employee} />
          <Route exact path="/admin/customers" component={Customer} />
        </Switch>
      </Router>
    </Provider>
  );
>>>>>>> 441b5e3362614f46559f321e9429d4c7a627001d
}

export default App;
