import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import contractABI from '../contracts/authABI.json';

const abi = contractABI.output.abi;
const CONTRACT_ADDRESS = '0xd2a5bC10698FD955D1Fe6cb468a17809A08fd005';

const Login = () => {
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      if (!window.ethereum) throw new Error("Metamask not detected");

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, abi, signer);

      const signerAddress = await signer.getAddress();
      const tx = await contract.Login(signerAddress, password);
      await tx.wait();

      setMessage('Login successful!');
    } catch (err) {
      console.error(err);
      setMessage(`Login failed or rejected: ${err.message || err}`);
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default Login;
