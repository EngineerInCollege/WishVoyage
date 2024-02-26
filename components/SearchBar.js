import React, { useState } from 'react';
import styled from 'styled-components';

const destinations = [
  { label: 'Africa', href: '#africa' },
  { label: 'Asia', href: '#asia' },
  { label: 'Caribbean Islands', href: '#caribbean' },
  { label: 'Central America', href: '#central-america' },
  { label: 'Europe', href: '#europe' },
  { label: 'Middle East', href: '#middle-east' },
  { label: 'North America', href: '#north-america' },
  { label: 'South America', href: '#south-america' },
];

const interests = [
  { label: 'Art & Culture', href: '#art-culture' },
  { label: 'Food & Drink', href: '#food-drink' },
  { label: 'History', href: '#history' },
  { label: 'Wildlife & Nature', href: '#wildlife-nature' },
];

const SearchBarContainer = styled.div`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
  padding: 10px;
  border-radius: 15px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-right: 11px;
  width: 200px;
`;

const DropdownMenu = styled.select`
  padding: 8px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  width: 200px;
  cursor: pointer;
`;

const SearchButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

const DropdownMenuItem = styled.option`
  display: block;
  padding: 8px 15px;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    // Filter destinations and interests based on input value
    const destinationSuggestions = destinations.filter(destination =>
      destination.label.toLowerCase().includes(value.toLowerCase())
    );
    const interestSuggestions = interests.filter(interest =>
      interest.label.toLowerCase().includes(value.toLowerCase())
    );
    // Concatenate and set suggestions
    setSuggestions([...destinationSuggestions, ...interestSuggestions]);
  };

  const handleSearch = () => {
    // Navigate to the search results page with inputValue
    console.log('Search:', inputValue);
  };

  return (
    <SearchBarContainer>
      <DropdownMenu onChange={handleInputChange}>
        <option value="">Select Destination</option>
        {destinations.map((destination, index) => (
          <DropdownMenuItem key={index} value={destination.label}>{destination.label}</DropdownMenuItem>
        ))}
      </DropdownMenu>
      <DropdownMenu onChange={handleInputChange}>
        <option value="">Select Interest</option>
        {interests.map((interest, index) => (
          <DropdownMenuItem key={index} value={interest.label}>{interest.label}</DropdownMenuItem>
        ))}
      </DropdownMenu>
      <SearchInput
        type="text"
        placeholder="Search destinations or interests"
        value={inputValue}
        onChange={handleInputChange}
        list="suggestions"
      />
      <datalist id="suggestions">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion.label} />
        ))}
      </datalist>
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;