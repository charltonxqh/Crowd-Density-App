import React, { useState, useEffect } from 'react';
import { getCurrentLocation, fetchNearestStations, performSearch } from './NearbyStationController';

/**
 * Home UI Component
 * @returns The HTML elements to be displayed on the website.
 */
const HomeUI = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [nearestStations, setNearestStations] = useState([]);

  useEffect(() => {
    getCurrentLocation(setCurrentLocation, fetchNearestStations);
  }, []);

  /**
   * Handles the search form submission
   * Logs the search input and processes the search query.
   * @param {Event} e - The form submit event
   */
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchInput.value;
    console.log('Searching for station:', searchQuery);
    performSearch(searchQuery, setNearestStations);
  };

  return (
    <>
    </>
  );
};

export default HomeUI;
