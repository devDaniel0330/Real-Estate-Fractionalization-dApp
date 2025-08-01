import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    address: '',
    password: '',
    isAdmin: false,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/register', {
        walletAddress: form.address,
        password: form.password,
        isAdmin: form.isAdmin,
      });

      setMessage('Registration successful. You may now log in.');
    } catch (err) {
      setMessage('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>{form.isAdmin ? 'Admin Register' : 'User Register'}</h2>
      <input
        type="text"
        name="address"
        placeholder="Wallet Address"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <label>
        <input
          type="checkbox"
          name="isAdmin"
          checked={form.isAdmin}
          onChange={handleChange}
        />{' '}
        Register as Admin
      </label>
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
};

export default Register;