import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from "next/router"

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
  font-family: 'Arial';
  position: absolute;
  font-size: 0.75vw;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
  padding: .5vw;
  border-radius: 1vw;
`;

const SearchInput = styled.input`
  padding: .5vw;
  border: none;
  border-radius: 1vw;
  margin-right: 2vw;
  width: 10vw;
`;

const DropdownMenu = styled.select`
  padding: .5vw;
  border: none;
  border-radius: .5vw;
  margin-right: 1vw;
  width: 10vw;
  cursor: pointer;
`;

const SearchButton = styled.button`
  padding: .5vw 2vw;
  border: none;
  border-radius: .3vw;
  background-color: #cf532d;
  color: white;
  cursor: pointer;
`;

const DropdownMenuItem = styled.option`
  display: block;
  padding: .5vw;
  font-size: .75vw;
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
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');
  const router = useRouter();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  
    // Check if the entered value matches any country
    const matchedDestination = destinations.find(destination =>
      destination.label.toLowerCase() === value.toLowerCase()
    );
  
    // Check if the entered value matches any interest
    const matchedInterest = interests.find(interest =>
      interest.label.toLowerCase() === value.toLowerCase()
    );
  
    // Enable setSelectedDestination if the entered value matches any country
    if (matchedDestination) {
      setSelectedDestination(matchedDestination.label);
      setSelectedInterest('');
    } else {
      setSelectedDestination('');
    }
  
    // Enable setSelectedInterest if the entered value matches any interest
    if (matchedInterest) {
      setSelectedInterest(matchedInterest.label);
      setSelectedDestination('');
    } else {
      setSelectedInterest('');
    }
  
    // Filter suggestions based on input value
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
    let formattedValue = '';
    if (selectedDestination) {
      // If a destination is selected, format its value
      formattedValue = selectedDestination.toLowerCase().replace(/\s+/g, '-');
      // Navigate to /destinations/(country)
      router.push(`/destinations/${formattedValue}`);
    } else if (selectedInterest) {
      // If an interest is selected, format its value
      formattedValue = selectedInterest.toLowerCase().replace(/\s+/g, '-');
      // Navigate to /interests/(interest)
      router.push(`/interests/${formattedValue}`);
    } else {
      if (inputValue.trim() !== '') {
        setInputValue('');
      }  
      // Handle no selection case
        console.log('Please select a destination or interest.');
    }
  };

  // Update input value when a selection is made
  useEffect(() => {
    if (selectedDestination) {
      setInputValue(selectedDestination);
    } else if (selectedInterest) {
      setInputValue(selectedInterest);
    }
  }, [selectedDestination, selectedInterest]);

  return (
    <SearchBarContainer>
      <DropdownMenu onChange={(e) => setSelectedDestination(e.target.value)}>
        <option value="">Select Destination</option>
        {destinations.map((destination, index) => (
          <DropdownMenuItem key={index} value={destination.label}>{destination.label}</DropdownMenuItem>
        ))}
      </DropdownMenu>
      <DropdownMenu onChange={(e) => setSelectedInterest(e.target.value)}>
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