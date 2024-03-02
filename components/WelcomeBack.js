import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { fetchRecentSearches } from '../firebase/firebaseConfig';

/* This code defines a welcome back component, which is responsible for rendering a personalized
*  welcome back div dispaleyd recent searches for a user. The component retrieves recent searches
* from Firebase using the fetchRecentSearches function provided by the firebaseConfig. If recent
* searches are available, the component displays them in a container, showing the title and image
* of each searched place. The recent searches are displaeyd in reverse chronological order, with
* only the three most recent searches shown. The component also includes scroll-based visibility
* handling, which makes sure that the welcome back message and recent searches are only displayed
* when they come into view during scrolling.
*/

// Existing styled components for animations
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(3vw);
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
  border-right: 1vw solid transparent;
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
  font-size: 2vw;
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
  background-color: white;
  box-shadow: 0 0 1vw rgba(0, 0, 0, 0.1);
  border-radius: 2vw;
  overflow: hidden; 
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  width: 100%; 
  height: 20vw; 
  overflow: hidden;
  position: relative;
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const PlaceDescription = styled.p`
  font-family: arial;
  font-size: 1vw;
  text-align: left;
  margin: 2vw;
  color: black;
`;

const RecentPlaceLink = styled.a`
  text-decoration: none; 
  color: inherit;
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
            {recentSearches.slice(-3).reverse().map((place, index) => (
              <RecentPlace>
              <RecentPlaceLink
                key={index}
                href={place.googleSearchLink} 
                target="_blank"
                rel="noopener noreferrer"            
              >
                <div>
                  <PlaceDescription>{place.title}</PlaceDescription>
                </div>
                <ImageWrapper>
                  <PlaceImage src={place.imageSrc} alt={place.name} />
                </ImageWrapper>
              </RecentPlaceLink>
            </RecentPlace>
            ))}
          </RecentPlaceContainer>
        </>
      )}
    </WelcomeBackContainer>
  );
};

export default WelcomeBack;
