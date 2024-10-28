import React from 'react';
import { useEffect,useState } from 'react';
import './SearchBar.css';

const stations = ['Marina Bay','Bayfront','Dhoby Ghaut','Bras Basah','Esplanade','Promenade','Nicoll Highway','Stadium','Mountbatten','Dakota','Paya Lebar','MacPherson','Tai Seng','Bartley','Serangoon','Lorong Chuan','Bishan','Marymount','Caldecott','Botanic Gardens','Farrer Road','Holland Village','Buona Vista','one-north','Kent Ridge','Haw Par Villa','Pasir Panjang','Labrador Park','Telok Blangah','HarbourFront','Bukit Panjang','Cashew','Hillview','Beauty World','King Albert Park','Sixth Avenue','Tan Kah Kee','Stevens','Newton','Little India','Rochor','Bugis','Downtown','Telok Ayer','Chinatown','Fort Canning','Bencoolen','Jalan Besar','Bendemeer','Geylang Bahru','Mattar','Ubi','Kaki Bukit','Bedok North','Bedok Reservoir','Tampines West','Tampines','Tampines East','Upper Changi','Expo','Changi Airport','Pasir Ris','Simei','Tanah Merah','Bedok','Kembangan','Eunos','Aljunied','Kallang','Lavender','City Hall','Raffles Place','Tanjong Pagar','Outram Park','Tiong Bahru','Redhill','Queenstown','Commonwealth','Dover','Clementi','Jurong East','Chinese Garden','Lakeside','Boon Lay','Pioneer','Joo Koon','Gul Circle','Tuas Crescent','Tuas West Road','Tuas Link','Clarke Quay','Farrer Park','Boon Keng','Potong Pasir','Woodleigh','Kovan','Hougang','Buangkok','Sengkang','Punggol','Bukit Batok','Bukit Gombak','Choa Chu Kang','Yew Tee','Kranji','Marsiling','Woodlands','Admiralty','Sembawang','Canberra','Yishun','Khatib','Yio Chu Kang','Ang Mo Kio','Braddell','Toa Payoh','Novena','Orchard','Somerset','Marina South Pier','Woodlands North','Woodlands South','Springleaf','Lentor','Mayflower','Bright Hill','Upper Thomson','Napier','Orchard Boulevard','Great World','Havelock','Maxwell','Shenton Way','Gardens by the Bay','Tanjong Rhu','Katong Park','Tanjong Katong','Marine Parade','Marine Terrace','Siglap','Bayshore','South View','Keat Hong','Teck Whye','Phoenix','Petir','Pending','Bangkit','Fajar','Segar','Jelapang','Senja','Cheng Lim','Farmway','Kupang','Thanggam','Fernvale','Layar','Tongkang','Renjong','Compassvale','Rumbia','Bakau','Kangkar','Ranggung','Cove','Meridian','Coral Edge','Riviera','Kadaloor','Oasis','Damai','Sam Kee','Teck Lee','Punggol Point','Samudera','Nibong','Sumang','Soo Teck'];

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
  
    const handleInputChange = (e) => {
      const value = e.target.value.toLowerCase();
      setQuery(value);
  
      if (value) {
        const filteredStations = stations
          .filter((station) => station.toLowerCase().includes(value))
          .slice(0,5);
        setSuggestions(filteredStations);
      } else {
        setSuggestions([]);
      }
    };
  
    const handleSuggestionClick = (station) => {
      setQuery(station);
      setSuggestions([]);
    };
  
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setSuggestions([]);
      }
    };

    const clearSearch = () => {
      setQuery('');
    };
  
    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, []);
  
    return (
      <div className="search-container">
        <div className="search-bar">
        <button className="icon magnifying-glass" onClick={() => console.log(query)}>🔍</button>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a station..."
          className="search-input"
        />
         <button className="icon trash-bin" onClick={clearSearch}>🗑️</button>
         </div>
        {suggestions.length > 0 && (
          <div className="suggestions-box">
            {suggestions.map((station) => (
              <div
                key={station}
                onClick={() => handleSuggestionClick(station)}
                className="suggestion-item"
              >
                {station}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default SearchBar;