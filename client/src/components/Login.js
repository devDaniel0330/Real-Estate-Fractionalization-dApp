import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({
    address: '',
    password: '',
    isAdmin: false,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        walletAddress: form.address,
        password: form.password,
        isAdmin: form.isAdmin,
      });

      const key = form.isAdmin ? 'admin' : 'user';
      localStorage.setItem(key, JSON.stringify(res.data.user));

      navigate(form.isAdmin ? '/admin/dashboard' : '/dashboard');
    } catch (err) {
      setMessage('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>{form.isAdmin ? 'Admin Login' : 'User Login'}</h2>
      <input type="text" name="address" placeholder="Wallet Address" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
      <label>
        <input type="checkbox" name="isAdmin" checked={form.isAdmin} onChange={handleChange} />{' '}
        Login as Admin
      </label>
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
};

export default Login;