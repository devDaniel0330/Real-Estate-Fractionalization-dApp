import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProperty from '../components/AddProperty';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.isAdmin === 1 || user?.isAdmin === true || user?.isAdmin === '1';
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/properties');
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error('failed to fetch properties: ', err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  if (!isAdmin) {
    return (
      <div>
        <h1>Admin Dashboard</h1>
        <p>You are not authorized to view this section.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <button onClick={() => setShowAddPropertyForm(!showAddPropertyForm)}>
        {showAddPropertyForm ? 'Hide Add Property Form' : 'Add Property'}
      </button>

      {showAddPropertyForm && <AddProperty onPropertyAdded={fetchProperties} />}

      <h2>Available Properties</h2>
      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <ul>
          {properties.map((p) => (
            <li key={p.id}>
              <strong>{p.title}</strong> – RM{p.price}<br />
              {p.description}
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;