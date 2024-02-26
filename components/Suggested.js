import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SuggestedPlacesContainer = styled.div`
  background-color: white;
  padding: 10vw;
`;

const MainTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`

const MainText = styled.div`
  padding-left: 40%;
  font-size: 2vw;
  margin-bottom: 2vw;
  font-family: 'Serif';
  color: black;
`;

const MainTextItalicized = styled.span`
  font-style: italic;
`;

const Divider = styled.div`
  width: 35%;
  height: .1vw;
  background-color: #d6d4d4;
  margin: 0 auto;
  margin-top: -1.5vw;
`

const SuggestedPlacesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 6vw;
  padding-left: 6vw;
  padding-right: 6vw;
`;

const SuggestedPlaceContainer = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  margin-bottom: 2vw;
  border-radius: 1vw;
  overflow: hidden;
  box-shadow: 0 0 1vw rgba(0, 0, 0, 0.1);
  justify-content: space-evenly;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const SuggestedPlaceImage = styled.img`
  width: 100%;
  height: 15vw;
  object-fit: cover;
`;

const SuggestedPlaceContent = styled.div`
  padding: 25px;
  color: black;
`;

const SuggestedPlaceName = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const SuggestedPlaceLocation = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;

const SuggestedPlaceDescription = styled.p`
  font-size: 16px;
`;

const SuggestedPlaces = ({ country }) => {
  const [placeData, setPlaceData] = useState([]);
  const axios = require('axios');

  useEffect(() => {
    async function getPlaceData() {
      try {
        const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=1&page%5Blimit%5D=10&page%5Boffset%5D=0`, {
          headers: {
            'Authorization': 'Bearer LI3a4NhfCXuBix4tUL0D2LHn0pj3'
          }
        });
        console.log(response.data); // Log the response data
        setPlaceData(response.data.data); // Set placeData to the array of locations
        
        // For each place, fetch the top image and create Google search link
        response.data.data.forEach(async place => {
          const imageUrls = await searchImages(place.name);
          console.log('Image URLs for', place.name, ':', imageUrls);
          // Assuming the first image is the top image
          place.imageSrc = imageUrls[0];
          // Create Google search link
          place.googleSearchLink = `https://www.google.com/search?q=${encodeURIComponent(place.name)}`;
          // Update state to reflect the change in imageSrc and googleSearchLink
          setPlaceData(prevState => {
            return prevState.map(prevPlace => {
              if (prevPlace.id === place.id) {
                return place;
              }
              return prevPlace;
            });
          });
        });
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    }
  
    getPlaceData();
  }, []);  

  async function searchImages(query) {
    const apiKey = 'AIzaSyC-pZpSwQE57H4xx2AtAxMbs5RAD05Pr-k';
    const cx = '631d1d1a0d5d34b4d'; // Replace with your Custom Search Engine ID
    const searchType = 'image';
  
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&searchType=${searchType}&key=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      // Parse the response and extract image URLs
      const imageUrls = response.data.items.map(item => item.link);
      return imageUrls;
    } catch (error) {
      console.error('Error searching images:', error);
      return [];
    }
  }  

  return (
    <SuggestedPlacesContainer>
      <MainTextContainer>
        <MainText>
          Get away, right <MainTextItalicized>away</MainTextItalicized>
        </MainText>
        <Divider></Divider>
      </MainTextContainer>
      
      <SuggestedPlacesWrapper>
        {placeData.map(place => (
          <SuggestedPlaceContainer key={place.id} href={place.googleSearchLink} target="_blank" rel="noopener noreferrer">
            <SuggestedPlaceImage src={place.imageSrc} alt={place.name} />
            <SuggestedPlaceContent>
              <SuggestedPlaceName>{place.name}</SuggestedPlaceName>
              <SuggestedPlaceLocation>{place.location}</SuggestedPlaceLocation>
              <SuggestedPlaceDescription>{place.description}</SuggestedPlaceDescription>
            </SuggestedPlaceContent>
          </SuggestedPlaceContainer>
        ))}
      </SuggestedPlacesWrapper>
    </SuggestedPlacesContainer>
  );
};

export default SuggestedPlaces;
