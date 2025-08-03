import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = () => {
  const [form, setForm] = useState({ title: '', description: '', price: '' });
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
    } catch (err) {
      setMessage('fail to add property: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Property</h2>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input name="price" placeholder="Price" type="number" onChange={handleChange} required />
      <button type="submit">Add</button>
      <p>{message}</p>
    </form>
  );
};

export default AddProperty;