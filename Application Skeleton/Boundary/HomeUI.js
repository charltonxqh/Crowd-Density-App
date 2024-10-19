import React, { useState, useEffect } from 'react';
import GoogleMap from 'google-maps-react';

const HomeUI = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [nearestStations, setNearestStations] = useState([]);

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        // Call a function to fetch nearest stations based on the current location
        fetchNearestStations(latitude, longitude);
      },
      (error) => {
        console.error('Error fetching location:', error);
      }
    );
  }, []);

  const fetchNearestStations = (lat, lng) => {
    // Fetch nearest MRT stations based on the user's location
    // Placeholder for the API call
    console.log('Fetching nearest stations for:', lat, lng);
    // Example of setting nearest stations (replace with actual data fetching logic)
    setNearestStations(['Station A', 'Station B', 'Station C', 'Station D', 'Station E', 'Station F']);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Logic to search for MRT station based on searchTerm
    console.log('Searching for station:', searchTerm);
  };

  return (
      <>
      </>
  )
};

export default HomeUI;
