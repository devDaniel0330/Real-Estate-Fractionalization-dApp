import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (isAdminLogin && data.user.isAdmin !== 1) {
          alert('This is not an admin account.');
          return;
        }

        if (!isAdminLogin && data.user.isAdmin === 1) {
          alert('This is not a user account.');
          return;
        }
        
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));

        if (data.user.isAdmin === 1) {
          navigate('/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{isAdminLogin ? 'Admin Login' : 'User Login'}</h2>

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={isAdminLogin}
          onChange={() => setIsAdminLogin(!isAdminLogin)}
        />{' '}
        Login as Admin
      </label>

      <form onSubmit={handleLogin} className={styles.form}>
        <input type="text" placeholder="Wallet Address" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} className={styles.input} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} />
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;