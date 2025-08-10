import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddProperty.module.css';

const AddProperty = ({ onPropertyAdded }) => {
  const [form, setForm] = useState({ title: '', description: '', price_per_share: '', total_shares: '', contract_address: '', owner_wallet: '', image_url: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/properties', form);
      setMessage('property added');
      setForm({ title: '', description: '', price_per_share: '', total_shares: '', contract_address: '', owner_wallet: '', image_url: '' });
      onPropertyAdded();
    } catch (err) {
      setMessage('fail to add property: ' + err.message);
    }
  };

  return (
    <div className={styles.addProperty}>
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit}>

        <div className={styles.formGroup}>
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Price per Share</label>
          <input type="number" name="price_per_share" value={form.price_per_share} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Total Shares</label>
          <input type="number" name="total_shares" value={form.total_shares} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Contract Address (optional)</label>
          <input name="contract_address" value={form.contract_address} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Owner Wallet (optional)</label>
          <input name="owner_wallet" value={form.owner_wallet} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Image URL (optional)</label>
          <input name="image_url" value={form.image_url} onChange={handleChange} />
        </div>

        <button type="submit" className={styles.button}>Add Property</button>
        <p className={styles.status}>{message}</p>
      </form>
    </div>
  );
};

export default AddProperty;