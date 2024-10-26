/* global google, map, infowindow */

import React, { useEffect, useState } from 'react';
import './NearbyStationMap.css';
import NearbyStationList from './NearbyStationList';

const NearbyStationMap = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [stations, setStations] = useState([]);

  useEffect(() => {
    // Load Google Maps script dynamically
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBVamnyuIq-K7dy7S5w8RTxctHc5Oafb6w&libraries=places&callback=initMap`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);

    window.initMap = initMap; // Make initMap globally accessible

    function initMap() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
    
              // Create a new map centered on the user's location
              const map = new google.maps.Map(document.getElementById("map"), {
                center: userLocation,
                zoom: 15,
              });
    
              new google.maps.Marker({
                position: userLocation,
                map: map,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 6,
                  fillColor: '#4285F4',
                  fillOpacity: 1, 
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                }
              })

              new google.maps.Circle({
                center: userLocation,
                radius: 100,
                map: map,
                strokeColor: '#4285F4',
                strokeWeight: 1,
                fillColor: '#4285F4',
                fillOpacity: 0.15,
              })

              const request = {
                location: userLocation, // Use user's current location
                radius: '5000', // 5000 meters search radius
                type: ['subway_station'], // Search for subway/MRT stations
              };
    
              const service = new google.maps.places.PlacesService(map);
              service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                  setStations(results);
                  getDistanceToStations(userLocation, results);
                  for (let i = 0; i < results.length; i++) {
                    createMarker(results[i], map);
                  }
                } else {
                  setErrorMessage('No nearby stations found. Please try again!')
                }
              });
          }, () => {
            setErrorMessage('Unable to retrieve your location. Please try again!')
          });
        } else {
          setErrorMessage('Geolocation is not supported by your browser.')
        }
      }

    function createMarker(place, map) {
      if (!place.geometry || !place.geometry.location) return;

      const infowindow = new google.maps.InfoWindow();
      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
        title: place.name,
      });

      google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(`<strong>${place.name}</strong><br>${place.vicinity}`);
        infowindow.open(map, marker);
      });
    }
  }, []);

  function getDistanceToStations(userLocation, stations) {
    const service = new google.maps.DistanceMatrixService();
    const destinations = stations.map((station) => station.geometry.location);

    service.getDistanceMatrix(
      {
        origins: [userLocation],
        destinations: destinations,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          console.log("Distance Matrix response:", response);
          const results = response.rows[0].elements;
          const updatedStations = stations.map((station, index) => ({
            ...station,
            distance: results[index].distance.text,
          }));
          setStations(updatedStations); // Update stations with distance and duration
        } else {
          console.error('Distance Matrix request failed due to ' + status);
        }
      }
    );
  }

  return (
    <div>
      <div id="map" style={{ height: '300px', width: '100%' }}></div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {/* Render the NearbyStationsList component and pass stations as a prop */}
      <NearbyStationList stations={stations} />
    </div>
  );
};

export default NearbyStationMap;
