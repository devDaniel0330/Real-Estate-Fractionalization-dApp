import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <h2>Add New Property</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="price_per_share" placeholder="Price per Share" type="number" value={form.price_per_share} onChange={handleChange} required />
      <input name="total_shares" placeholder="Total Shares" type="number" value={form.total_shares} onChange={handleChange} required />
      <input name="contract_address" placeholder="Contract Address (optional)" value={form.contract_address} onChange={handleChange} />
      <input name="owner_wallet" placeholder="Owner Wallet (optional)" value={form.owner_wallet} onChange={handleChange} />
      <input name="image_url" placeholder="Image URL (optional)" value={form.image_url} onChange={handleChange} />
      <button type="submit">Add Property</button>
      <p>{message}</p>
    </form>
  );
};

export default AddProperty;