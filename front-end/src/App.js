import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar.js';

function App() {
  return (
    <div className="App">
      <h1>WELCOME TO MEALSPOT~~~</h1>
      <Router>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
