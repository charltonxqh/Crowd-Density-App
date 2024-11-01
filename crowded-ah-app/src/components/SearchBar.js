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
import stationsInfo from '../stationsInfo.json';

const stations = Object.keys(stationsInfo);

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [user, setUser] = useState(null);

  const { isGuest } = useGuest();
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

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
      setSuggestions(filteredStations);
    } else {
      setSuggestions([]);
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
        favourites: arrayUnion(selectedStation), // Add the station to the user's favourites
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
      navigate("/stations", { state: { stationName: selectedStation } });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  }

  const combinedResults = [
    ...favourites.map((station) => ({ name: station, isFavourite: true })),
    ...suggestions
      .filter((station) => !favourites.includes(station))
      .map((station) => ({ name: station, isFavourite: false })),
  ];

  return (
    <div className="search-container">
      <div className="search-bar">
        <button
          className="icon magnifying-glass"
          onClick={onSearch}
        >
          🔍
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
          🗑️
        </button>
        <button className="icon favourite-star" onClick={handleAddFavourite}>
          ⭐
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="result-box">
          {combinedResults.map(({ name, isFavourite }) => (
            <div
              key={name}
              className="result-item"
              onClick={() => handleSuggestionClick(name)}
            >
              {isFavourite && <button className="remove-icon" onClick={() => handleDeleteFavourite(name)}>⭐</button>}
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
