/* global google, map, infowindow */

import React, { useEffect, useState } from "react";
import "./NearbyStationMap.css";
import NearbyStationList from "./NearbyStationList";
import SearchBar from "./SearchBar";

const NearbyStationMap = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [stations, setStations] = useState([]);
  const [radius, setRadius] = useState(5000);

  useEffect(() => {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBVamnyuIq-K7dy7S5w8RTxctHc5Oafb6w&libraries=places&callback=initMap`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);

    window.initMap = initMap;

    function initMap() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
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

    function fetchNearbyStations(userLocation, map) {
      const request = {
        location: userLocation,
        radius: radius.toString(), // Use the current radius value
        type: ["subway_station"],
      };

      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setStations(results);
          setErrorMessage("");
          getDistanceToStations(userLocation, results);
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i], map);
          }
        } else {
          setErrorMessage("No nearby stations found. Please try again!");
        }
      });
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
        infowindow.setContent(
          `<strong>${place.name}</strong><br>${place.vicinity}`
        );
        infowindow.open(map, marker);
      });
    }
  }, [radius]); // Re-run the useEffect when the radius changes

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
        <input
          id="radius-slider"
          type="range"
          min="1000"
          max="10000"
          step="500"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
        />
        <input
          type="number"
          min="1000"
          max="10000"
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
