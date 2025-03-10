import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import React from "react";

const citySuggestions = ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Pune", "Ahmedabad"];

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    
    if (value.trim() === "") {
      setFilteredCities([]);
    } else {
      const filtered = citySuggestions.filter((c) =>
        c.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  };

  const handleSelectCity = (selectedCity) => {
    setCity(selectedCity);
    setFilteredCities([]);
    onSearch(selectedCity);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="relative w-80">
        <div className="flex">
          <input
            type="text"
            className="p-2 w-full border border-gray-300 rounded-l-lg outline-none"
            placeholder="Enter city name..."
            value={city}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg flex items-center"
            onClick={() => onSearch(city)}
          >
            <FaSearch className="mr-2" /> Search
          </button>
        </div>

        {filteredCities.length > 0 && (
          <ul className="absolute top-full left-0 bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
            {filteredCities.map((c, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelectCity(c)}
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
