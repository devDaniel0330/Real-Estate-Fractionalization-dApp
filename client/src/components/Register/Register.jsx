import React, { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
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
        username: form.username,
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
    <form onSubmit={handleRegister} className={styles.formContainer}>
      <h2 className={styles.heading}>{form.isAdmin ? 'Admin Register' : 'User Register'}</h2>
      <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required className={styles.input} />
      <input type="text" name="address" placeholder="Wallet Address" onChange={handleChange} required className={styles.input} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className={styles.input} />
      <label>
        <input type="checkbox" name="isAdmin" checked={form.isAdmin} onChange={handleChange} />{' '}
        Register as Admin
      </label>
      <button type="submit" className={styles.button}>Register</button>
      <p className={styles.message}>{message}</p>
    </form>
  );
};

export default Register;