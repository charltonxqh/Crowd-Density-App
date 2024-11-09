/* global google, map, infowindow */

/**
 * @fileoverview NearbyStationMap component displays a Google Map centered on the user's location with nearby MRT stations
 * based on a specified radius. It also provides a list of these nearby stations and allows users to adjust the search radius.
 * The component handles fetching nearby stations, calculating walking distances and displaying them on a map and in a list.
 * @author Charlton Siaw Qi Hen
 */

import React, { useEffect, useState } from "react";
import "./NearbyStationMap.css";
import NearbyStationList from "./NearbyStationList";
import SearchBar from "./SearchBar";

/**
 * NearbyStationMap component that displays nearby MRT stations within a specified radius on Google Maps.
 * @component
 */
const NearbyStationMap = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [stations, setStations] = useState([]);
  const [radius, setRadius] = useState(5000);

  useEffect(() => {
    // Load Google Maps script and initialize map when component mounts
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBVamnyuIq-K7dy7S5w8RTxctHc5Oafb6w&libraries=places&callback=initMap`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);

    window.initMap = initMap;

    /**
     * Initializes the Google Map and centers it on the user's current location.
     * Calls fetchNearbyStations to retrieve nearby stations based on the specified radius.
     */
    function initMap() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              // lat: position.coords.latitude,
              // lng: position.coords.longitude,
              lat: 1.3442675,
              lng: 103.6864634,
            };

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
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              },
            });

            new google.maps.Circle({
              center: userLocation,
              radius: 100,
              map: map,
              strokeColor: "#4285F4",
              strokeWeight: 1,
              fillColor: "#4285F4",
              fillOpacity: 0.15,
            });

            fetchNearbyStations(userLocation, map);
          },
          () => {
            setErrorMessage(
              "Unable to retrieve your location. Please try again!"
            );
          }
        );
      } else {
        setErrorMessage("Geolocation is not supported by your browser.");
      }
    }

    /**
     * Fetches nearby MRT stations based on the user's location and the specified search radius.
     * Updates the stations state with the retrieved station data.
     * @param {Object} userLocation - The user's current location (latitude and longitude).
     * @param {Object} map - Google Map instance.
     */
    function fetchNearbyStations(userLocation, map) {
      const request = {
        location: userLocation,
        radius: radius.toString(), // Use the current radius value
        type: ["subway_station"],
      };

      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          if (results.length > 0) {
            setStations(results);
            setErrorMessage("");
            getDistanceToStations(userLocation, results);
            for (let i = 0; i < results.length; i++) {
              createMarker(results[i], map);
            }
          } else {
            setStations([]);
            setErrorMessage("No nearby stations found. Please try again!");
          }
        } else {
          setStations([]);
          setErrorMessage("No nearby stations found. Please try again!");
        }
      });
    }

    /**
     * Creates a marker on the Google Map for a specific place.
     * @param {Object} place - The place object containing station information.
     * @param {Object} map - Google Map instance.
     */
    function createMarker(place, map) {
      if (!place.geometry || !place.geometry.location) return;

      const infowindow = new google.maps.InfoWindow();
      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
        title: place.name,
      });

      google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(
          `<strong>${place.name}</strong><br>${place.vicinity}`
        );
        infowindow.open(map, marker);
      });
    }
  }, [radius]);

  /**
   * Fetches the walking distance between the user's location and each nearby station.
   * Updates the stations state with distance information.
   * @param {Object} userLocation - The user's current location.
   * @param {Object[]} stations - Array of nearby station objects.
   */
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
          setStations(updatedStations);
        } else {
          console.error("Distance Matrix request failed due to " + status);
        }
      }
    );
  }

  /**
   * Updates the search radius based on user input.
   * @param {Object} e - Event object from the input change.
   */
  const handleRadiusChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1000 && value <= 10000) {
      setRadius(value);
    }
  };

  return (
    <div className="nearby-station-page">
      <div className="search-bar-container">
        <SearchBar />
      </div>
      <div className="slider-container">
        <label htmlFor="radius-slider">Search Radius: {radius} meters</label>
        <label htmlFor="radius-slider">PLEASE DRAG WITH CARE, INCREMENT by 500m each time as dragging too fast may crash the system</label>
        <input
          id="radius-slider"
          type="range"
          min="1000"
          max="10000"
          step="500"
          value={radius}
          onChange={handleRadiusChange}
        />
      </div>
      <div className="nearby-station-content">
        <div className="map-container" id="map"></div>
        <div className="nearby-station-list-container">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <NearbyStationList stations={stations} />
        </div>
      </div>
    </div>
  );
};

export default NearbyStationMap;
