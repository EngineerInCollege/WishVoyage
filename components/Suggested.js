import React from 'react';
import styled from 'styled-components';

// Sample data for suggested places
const suggestedPlacesData = [
  {
    id: 1,
    name: 'Suggested Place 1',
    imageSrc: '/croatia.jpg',
    description: 'Description of Suggested Place 1',
    location: '/suggested_place_1_location',
  },
  {
    id: 2,
    name: 'Suggested Place 2',
    imageSrc: '/croatia.jpg',
    description: 'Description of Suggested Place 2',
    location: '/suggested_place_2_location',
  },
  {
    id: 3,
    name: 'Suggested Place 3',
    imageSrc: '/croatia.jpg',
    description: 'Description of Suggested Place 3',
    location: '/suggested_place_3_location',
  },
  {
    id: 4,
    name: 'Suggested Place 4',
    imageSrc: '/croatia.jpg',
    description: 'Description of Suggested Place 4',
    location: '/suggested_place_4_location',
  },
];

const SuggestedPlacesContainer = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor || 'white'};
  padding: 10vw;
`;

const MainText = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 2vw;
  font-family: 'Serif';
  color: ${({ textColor }) => textColor || 'black'}; // Set text color
`;

const MainTextItalicized = styled.span`
  font-style: italic;
`;

const SuggestedPlacesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 4vw;
`;

const SuggestedPlaceContainer = styled.div`
  width: 47%;
  margin-bottom: 2vw;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  justify-content: space-evenly;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const SuggestedPlaceImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const SuggestedPlaceContent = styled.div`
  padding: 25px;
  color: ${({ textColor }) => textColor || 'black'}; // Set text color
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

const SuggestedPlaces = ({ backgroundColor }) => {
  // Conditionally set text color based on background color
  const mainTextColor = backgroundColor === 'black' ? 'white' : 'black';

  return (
    <SuggestedPlacesContainer backgroundColor={backgroundColor}>
      <MainText textColor={mainTextColor}>
        Get away, right <MainTextItalicized>away</MainTextItalicized>
      </MainText>
      <SuggestedPlacesWrapper>
        {suggestedPlacesData.map(place => (
          <SuggestedPlaceContainer key={place.id}>
            <SuggestedPlaceImage src={place.imageSrc} alt={place.name} />
            <SuggestedPlaceContent textColor={mainTextColor}> {/* Pass textColor prop */}
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
