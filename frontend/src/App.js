import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/layout/Homepage";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/admin/pages/Dashboard";
import Appointment from "./components/admin/pages/Appointment";
import Animal from "./components/admin/pages/Animal";
import Reminder from "./components/admin/pages/Reminder";
import Inventory from "./components/admin/pages/Inventory";
import Report from "./components/admin/pages/Report";
import Employee from "./components/admin/pages/Employee";
import Customer from "./components/admin/pages/Customer";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/admin/appointments" component={Appointment} />
          <Route exact path="/admin/animals" component={Animal} />
          <Route exact path="/admin/reminders" component={Reminder} />
          <Route exact path="/admin/inventory" component={Inventory} />
          <Route exact path="/admin/reports" component={Report} />
          <Route exact path="/admin/employees" component={Employee} />
          <Route exact path="/admin/customers" component={Customer} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
