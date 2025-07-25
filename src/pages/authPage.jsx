import React, { useState } from 'react';
import getContract from '../contracts/contract';

const AuthPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = async () => {
    try {
      const contract = getContract();
      const tx = await contract.register(name, password, address);
      await tx.wait();
      alert("User registered!");
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <input placeholder="Address" onChange={e => setAddress(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default AuthPage;
