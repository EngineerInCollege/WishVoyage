import React from 'react';
import styled from 'styled-components';

// Sample data for recent places
const recentPlacesData = [
  {
    id: 1,
    name: 'Place 1',
    imageSrc: '/place1.jpg',
    description: 'Description of Place 1',
  },
  {
    id: 2,
    name: 'Place 2',
    imageSrc: '/place2.jpg',
    description: 'Description of Place 2',
  },
  {
    id: 3,
    name: 'Place 3',
    imageSrc: '/place3.jpg',
    description: 'Description of Place 3',
  },
];

// Styled component for the container of each recent place
const RecentPlaceContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

// Styled component for each recent place
const RecentPlace = styled.div`
  margin-right: 20px;
`;

// Styled component for the image of each recent place
const PlaceImage = styled.img`
  width: 200px; 
  height: 150px; 
`;

// Styled component for the description of each recent place
const PlaceDescription = styled.p`
  font-size: 14px;
`;

const RecentPlaces = ({ places }) => {
  return (
    <RecentPlaceContainer>
      {places.map(place => (
        <RecentPlace key={place.id}>
          <PlaceImage src={place.imageSrc} alt={place.name} />
          <PlaceDescription>{place.description}</PlaceDescription>
        </RecentPlace>
      ))}
    </RecentPlaceContainer>
  );
};

const RecentPlacesSection = () => {

 

  return (
    <div>
      <h2>Recent Places</h2>
      <RecentPlaces places={recentPlaces} />
    </div>
  );
};

export default RecentPlacesSection;
