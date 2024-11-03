import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { useGuest } from "../components/GuestContext";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import stationsInfo from "../stationsInfo.json";

const stations = Object.keys(stationsInfo);

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [user, setUser] = useState(null);
  const [trainData, setTrainData] = useState([]);
  const [showError, setShowError] = useState(false);

  const { isGuest } = useGuest();
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  async function getTrainData() {
    try {
      const response = await fetch("http://localhost:4000/api/train-data");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched train data:", data);

      setTrainData(data);
    } catch (error) {
      console.error("Error fetching train data:", error);
    }
  }

  useEffect(() => {
    getTrainData();
  }, []);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // Fetch user's favourites from Firestore
        const userRef = doc(db, "users", user.uid);
        const unsubscribeFavourites = onSnapshot(userRef, (doc) => {
          setFavourites(doc.data()?.favourites || []);
        });
        return () => {
          unsubscribeFavourites();
        };
      } else {
        setFavourites([]);
      }
    });
    return () => unsubscribe();
  }, [auth, db]);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value) {
      const filteredStations = stations
        .filter((station) => station.toLowerCase().includes(value))
        .slice(0, 5);

      if (filteredStations.length === 0) {
        setShowError(true); // Show the error message
      } else {
        setShowError(false); // Hide the error message
      }

      setSuggestions(filteredStations);
    } else {
      setSuggestions([]);
      setShowError(false); // Hide the error message if the input is cleared
    }
  };

  const handleFocus = () => {
    // Show favourite stations when the search bar is clicked and there's no query
    if (!query && favourites.length > 0) {
      setSuggestions(favourites);
    }
  };

  const handleSuggestionClick = (station) => {
    setQuery(station);
    setSelectedStation(station);
    setSuggestions([]);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".search-container")) {
      setSuggestions([]);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSelectedStation(null);
    setSuggestions(favourites);
  };

  const handleAddFavourite = async () => {
    if (!selectedStation) return;

    if (isGuest || !user) {
      alert("Please log in to add a favourite station.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        favourites: arrayUnion(selectedStation),
      });
      alert(`${selectedStation} has been added to your favourites!`);
    } catch (error) {
      console.error("Error adding favourite station:", error);
    }
  };

  const handleDeleteFavourite = async (station) => {
    if (isGuest || !user) {
      alert("Please log in to delete a favourite station.");
      return;
    }
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        favourites: arrayRemove(station),
      });
      alert(`${station} has been removed from your favourites!`);
    } catch (error) {
      console.error("Error deleting favourite station:", error);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const onSearch = () => {
    if (selectedStation) {
      const stationData = stationsInfo[selectedStation];

      if (stationData) {
        const stationInfo = Array.isArray(stationData)
          ? stationData[0]
          : stationData;
        const { trainLine, stationCode } = stationInfo;
        const currentCrowdLevel = CrowdLabel(
          getCrowdLevel(trainLine, stationCode)
        );
        const forecastCrowdLevel = CrowdLabel(
          getCrowdLevel(trainLine, stationCode, true)
        );

        navigate(
          `/station/${trainLine}-${stationCode}-${encodeURIComponent(
            selectedStation
          )}`,
          {
            state: {
              currentCrowdLevel,
              forecastCrowdLevel,
            },
          }
        );
      } else {
        alert("Station details not found.");
      }
    }
  };

  const getCrowdLevel = (trainLine, stationCode, isForecast = false) => {
    const type = isForecast ? "forecast" : "realTime";
    if (
      trainData &&
      trainData[type] &&
      trainData[type][trainLine] &&
      trainData[type][trainLine][stationCode]
    ) {
      return trainData[type][trainLine][stationCode].CrowdLevel || "unknown";
    }
    return "unknown";
  };

  const CrowdLabel = (level) => {
    switch (level) {
      case "l":
        return "Low";
      case "m":
        return "Medium";
      case "h":
        return "High";
      default:
        return "Unknown";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const combinedResults = [
    ...favourites.map((station) => ({ name: station, isFavourite: true })),
    ...suggestions
      .filter((station) => !favourites.includes(station))
      .map((station) => ({ name: station, isFavourite: false })),
  ];

  return (
    <div className="search-container">
      <div className="search-bar">
        <button className="icon magnifying-glass" onClick={onSearch}>
          <img src="/images/search.png" alt="Search" className="search" />
        </button>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search for a station..."
          className="search-input"
        />
        <button className="icon trash-bin" onClick={clearSearch}>
          <img src="/images/delete.png" alt="Delete" className="dustbin" />
        </button>
        <button className="icon favourite-star" onClick={handleAddFavourite}>
          <img src="/images/fav.png" alt="Favourite" className="favourite" />
        </button>
      </div>

      {showError && (
        <div className="error-message">No matching results found.</div>
      )}

      {suggestions.length > 0 && (
        <div className="result-box">
          {combinedResults.map(({ name, isFavourite }) => (
            <div
              key={name}
              className="result-item"
              onClick={() => handleSuggestionClick(name)}
            >
              {isFavourite && (
                <button
                  className="remove-icon"
                  onClick={() => handleDeleteFavourite(name)}
                >
                  <img src="/images/fav.png" alt="Favourite" className="favourite" />
                </button>
              )}
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
