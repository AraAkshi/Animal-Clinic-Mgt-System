import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage'

function App() {
  return (
    <Router>
      <Homepage />
    </Router>
  );
}

export default App;
