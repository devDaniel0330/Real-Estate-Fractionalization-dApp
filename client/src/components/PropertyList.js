import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = ({ onBuy }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => {
        console.log('API response:', res.data);
        setProperties(res.data);
      })
      .catch(err => {
        console.error("Error fetching properties:", err.message);
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2>Available Properties</h2>
      {properties.map(prop => (
        <div key={prop.id}>
          <h3>{prop.title}</h3>
          <p>{prop.description}</p>
          <p><strong>Total Shares:</strong> {prop.total_shares}</p>
          <p><strong>Available Shares:</strong> {prop.available_shares.toLocaleString()}</p>
          <p><strong>Price per Share:</strong> ${prop.price_per_share}</p>
          <p><strong>Total Price:</strong> ${(prop.total_shares * prop.price_per_share).toLocaleString()}</p>
          <button onClick={() => onBuy && onBuy(prop.id)}>Buy</button>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;