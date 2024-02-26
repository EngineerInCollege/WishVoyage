import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Sample data for recent places
const recentPlacesData = [
  {
    id: 1,
    name: 'Place 1',
    imageSrc: '/croatia.jpg',
    description: 'Description of Place 1',
  },
  {
    id: 2,
    name: 'Place 2',
    imageSrc: '/croatia.jpg',
    description: 'Description of Place 2',
  },
  {
    id: 3,
    name: 'Place 3',
    imageSrc: '/croatia.jpg',
    description: 'Description of Place 3',
  },
];

// Existing styled components for animations
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const WelcomeBackContainer = styled.div`
  background-color: black;
  color: white;
  padding-top: 20vw;
  padding-bottom: 20vw;
  padding-left: 10vw;
  padding-right: 10vw;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

const WelcomeBackText = styled.div`
  font-size: 40px;
  font-family: 'Arial';
  white-space: nowrap;
  border-right: 2px solid transparent;
  font-weight: bold;
  animation: ${({ isVisible }) => (isVisible ? fadeInAnimation : 'none')} 0.5s ease forwards;
`;

const AdditionalText = styled.p`
  padding-top: 2vw;
  font-size: 25px;
  font-family: 'Times';
  white-space: wrap;
  animation: ${({ isVisible }) => (isVisible ? fadeInAnimation : 'none')} 0.5s ease forwards;
`;

const ItalicizedSpan = styled.span`
  font-style: italic;
`;

const RecentPlacesText = styled.p`
  padding-top: 10vw;
  padding-bottom: 2vw;
  font-size: 30px;
  font-family: 'Arial';
  white-space: wrap;
`;

const RecentPlaceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const RecentPlace = styled.div`
  margin: 1vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30%;
`;

const ImageWrapper = styled.div`
  width: 100%; 
  height: 20vw; 
  overflow: hidden;
  position: relative;
  border-radius: 20px;
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  transition: transform 0.3s ease;

  ${RecentPlace}:hover & {
    transform: scale(1.1); 
  }
`;

const PlaceDescription = styled.p`
  font-size: 20px;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 5px;
`;

const RecentPlacesContainer = styled.div`
  margin-top: 2vw;
`;

const WelcomeBack = ({ isLoggedIn, userName }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const componentPosition = document.getElementById('welcome-back')?.offsetTop;
      if (scrollPosition > componentPosition) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on component mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <WelcomeBackContainer id="welcome-back" isVisible={isVisible}>
      <WelcomeBackText isVisible={isVisible}>
        Welcome back, <ItalicizedSpan>{userName}</ItalicizedSpan>!
      </WelcomeBackText>
      <AdditionalText isVisible={isVisible}>
        We've missed you. Feel free to jump back into your previous
        searches and explore more adventures with us.
      </AdditionalText>
      <RecentPlacesContainer>
        <RecentPlacesText>
          Jump back in
        </RecentPlacesText>
        <RecentPlaceContainer>
          {recentPlacesData.map(place => (
            <RecentPlace key={place.id}>
              <div>
                <PlaceDescription>{place.description}</PlaceDescription>
              </div>
              <ImageWrapper>
                <PlaceImage src={place.imageSrc} alt={place.name} />
              </ImageWrapper>
            </RecentPlace>
          ))}
        </RecentPlaceContainer>
      </RecentPlacesContainer>
    </WelcomeBackContainer>
  );
};

export default WelcomeBack;
