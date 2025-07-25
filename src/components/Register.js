import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import contractABI from '../contracts/authABI.json';

const abi = contractABI.output.abi;
const contractAddress = '0xd2a5bC10698FD955D1Fe6cb468a17809A08fd005';

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const contract = new Contract(contractAddress, abi, signer);

      const tx = await contract.register(name, password, userAddress);
      await tx.wait();

      alert('Registered successfully!');
    } catch (err) {
      console.error(err);
      alert(`Registration failed: ${err.message || err}`);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;