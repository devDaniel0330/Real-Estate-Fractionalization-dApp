import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PropertyList.module.css';
import { useNavigate } from 'react-router-dom';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

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

  const handleViewDetails = (propertyId) => {
    navigate(`/buy/${propertyId}`);
  };

  return (
    <div className={styles.propertyList}>
      <h2>Available Properties</h2>
      {properties.length === 0 ? (
        <p>No properties available</p>
      ) : (
        properties.map(property => (
          <div key={property.id} className={styles.card}>
            <img src={property.image_url} alt={property.title} />
            <div className={styles.cardContent}>
              <h3>{property.title}</h3>
              <p>{property.description}</p>
              <div className={styles.price}>${property.price_per_share} / share</div>
            </div>
            <button className={styles.actionButton} onClick={() => handleViewDetails(property.id)}>View Details</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PropertyList;