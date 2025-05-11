import { useState } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function RegisterForm(){
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate(); 

  function handleRegister() {

    if (!name || !password) {
      alert("Please fill in both fields.");
      return;
    }
    
    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];

    if (storedAccounts.some((account) => account.name === name)) {
      alert("This account already exists.");
      return;
    }

    const newAccount = { name, password };
    storedAccounts.push(newAccount); 


    localStorage.setItem('accounts', JSON.stringify(storedAccounts));
    alert("Registration successful!");
    
    navigate('/login');
    
    setName('');
    setPassword('');
  }

return (
  <div>
  <h1>Register</h1>
  <input 
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Name"
  />

<input 
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  />
  
  <button onClick={handleRegister}>Register</button>
  <button onClick={() => navigate('/')}>Back</button>
  </div>
 );
}



export default RegisterForm;