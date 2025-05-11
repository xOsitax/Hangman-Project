import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Gamepage from "./components/HangmanGameLogic";
import Api from "./components/Api";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/gamepage" element={<Gamepage />} />
        <Route path="/api" element={<Api />} />
      </Routes>
    </Router>
  );
}

export default App;
