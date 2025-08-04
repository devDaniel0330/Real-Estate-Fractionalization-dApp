import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProperty from '../components/AddProperty';

const Dashboard = () => {
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

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <p>You are logged in as <strong>{isAdmin ? 'Admin' : 'User'}</strong>.</p>

      {isAdmin && (
        <>
          <button onClick={() => setShowAddPropertyForm(!showAddPropertyForm)}>
            {showAddPropertyForm ? 'Hide Add Property Form' : 'Add Property'}
          </button>

          {showAddPropertyForm && <AddProperty onPropertyAdded={fetchProperties} />}
        </>
      )}

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

export default Dashboard;