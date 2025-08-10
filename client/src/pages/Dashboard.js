import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProperty from '../components/AddProperty';
import PropertyList from '../components/PropertyList';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.isAdmin === 1 || user?.isAdmin === true || user?.isAdmin === '1';
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const goToBuyTokens = (propertyId) => {
    navigate(`/buy/${propertyId}`);
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

          {showAddPropertyForm && <AddProperty onPropertyAdded={() => {}} />}
        </>
      )}

      <PropertyList onBuy={goToBuyTokens} />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;