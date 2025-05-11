<<<<<<< HEAD
import HangmanGameLogic from './components/HangmanGameLogic';
import './index.css'

function App() {
  return (
    <div className="App">
      <HangmanGameLogic />
    </div>
  );
}

export default App;
=======
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
>>>>>>> origin/Authentication-System
