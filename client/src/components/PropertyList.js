import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Properties</h2>
      {properties.map(prop => (
        <div key={prop.id}>
          <h3>{prop.title}</h3>
          <p>{prop.description}</p>
          <strong>${prop.price}</strong>
          <button>Buy</button>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;