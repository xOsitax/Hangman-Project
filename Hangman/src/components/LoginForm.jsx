import { useState } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  function handleLogin() {

  const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
  const matchedAccount = storedAccounts.find(
    (account) => account.name === name && account.password === password
  );

  if (!name || !password) {
    alert("Please fill in both fields.");
    return;
  }


  if (!matchedAccount) {
    alert("Name or password is incorrect. Please try again.");
    setName('');
    setPassword('');
    return;
  }
  navigate('/gamepage');

  }


  return (
    <div>
    <h1>Log in</h1>
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
    
    <button onClick={handleLogin}>Log in</button>
    <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
}

export default LoginForm;