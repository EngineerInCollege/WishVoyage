import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { auth, db, fetchRecentSearches } from '../pages/firebase/firebaseConfig';
import { getDatabase, ref, onValue } from "firebase/database";


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
  background: linear-gradient(to bottom, #757171, #242323);
  color: white;
  padding-top: 6vw;
  padding-bottom: 10vw;
  padding-left: 10vw;
  padding-right: 10vw;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

const WelcomeBackText = styled.div`
  font-size: 2vw;
  color: white;
  font-family: 'serif';
  white-space: nowrap;
  border-right: 2px solid transparent;
  animation: ${({ isVisible }) => (isVisible ? fadeInAnimation : 'none')} 0.5s ease forwards;
`;

const Divider = styled.div`
  width: 100%;
  height: .1vw;
  background-color: white;
  margin-top: 1vw;
`

const AdditionalText = styled.p`
  padding-top: 2vw;
  font-size: 1vw;
  font-family: 'arial';
  white-space: wrap;
  animation: ${({ isVisible }) => (isVisible ? fadeInAnimation : 'none')} 0.5s ease forwards;
`;

const ItalicizedSpan = styled.span`
  font-style: italic;
`;

const RecentPlacesText = styled.p`
  padding-top: 8vw;
  padding-bottom: 1vw;
  font-size: 30px;
  font-family: 'serif';
  white-space: wrap;
`;

const RecentPlaceContainer = styled.div`
  margin-top: 2vw;
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

const WelcomeBack = ({ user }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

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

  useEffect(() => {
    if (user) {
      fetchRecentSearches(user.uid)
        .then(recentSearchesData => {
          if (recentSearchesData) {
            // Process and set the recent searches data
            setRecentSearches(recentSearchesData);
          }
        })
        .catch(error => {
          console.error('Error fetching recent searches:', error);
        });
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <WelcomeBackContainer id="welcome-back" isVisible={isVisible}>
      <WelcomeBackText isVisible={isVisible}>
        Welcome back, <ItalicizedSpan>{user.displayName}!</ItalicizedSpan>
        <Divider></Divider>
      </WelcomeBackText>
      <AdditionalText isVisible={isVisible}>
        We've missed you. Feel free to jump back into your previous
        searches and explore more adventures with us.
      </AdditionalText>
      {recentSearches.length > 0 && (
        <>
          <RecentPlacesText>Jump back in</RecentPlacesText>
          <RecentPlaceContainer>
            {recentSearches.slice(0, 3).map((place, index) => (
              <RecentPlace key={index}>
                <div>
                  <PlaceDescription>{place.description}</PlaceDescription>
                </div>
                <ImageWrapper>
                  <PlaceImage src={place.imageSrc} alt={place.name} />
                </ImageWrapper>
              </RecentPlace>
            ))}
          </RecentPlaceContainer>
        </>
      )}
    </WelcomeBackContainer>
  );
};

export default WelcomeBack;
