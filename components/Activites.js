import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { auth, db } from '../firebase/firebaseConfig';
import { getDatabase, get, ref, set } from "firebase/database";

/* This code defines a component called Activities, which is responsible for
*  displaying suggested activites and their locations based on the provided latitude and longitude
* coordinates (if the region of the country is included in the Amadeus API allowed regions).
* The component fetches place data by querying the Amadeus API for points of interest near the specified coordinates. It then renders
* the retrieved places as clickable containers with images and titles, each linking to a
* Google search pagefor more info about the place. Additionally, it includes functionality
 to add clicked places to the user's recent searches in Firebase Realtime Database, allowing
* users to visit previously explored destinations if logged in.
*/

const SuggestedPlacesContainer = styled.div`
  background-color: white;
  padding: 10vw;
`;

const MainTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const MainText = styled.div`
  padding-left: 35%;
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
`;

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
  width: calc(50% - 3vw); 
  margin-right: 2vw;
  margin-top: 1vw;

  &:nth-child(2n) {
    margin-right: 0;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const SuggestedPlaceImage = styled.img`
  width: 100%;
  height: 15vw;
  object-fit: cover;
`;

const SuggestedPlaceTitle = styled.p`
  font-size: 1vw;
  margin-top: 1vw;
  text-align: center;
  padding: 1vw;
`;

const SuggestedPlaces = ({ country, lat, long }) => {
  const [placeData, setPlaceData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (lat && long) {
          const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${lat}&longitude=${long}&radius=1&page%5Blimit%5D=4&page%5Boffset%5D=0`, {
            headers: {
              'Authorization': 'Bearer W6GfytJy503AhJZZAXGGJzAZpTIY'
            }
          });
  
          const placesData = response.data.data;
          const placesPromises = placesData.map(async place => {
            try {
              // Implement exponential backoff if a request fails with 429 status code
              let retries = 3;
              while (retries > 0) {
                try {
                  const imageResults = await searchImages(place.name, 1);
                  const places = imageResults.map(result => ({
                    title: result.title,
                    imageSrc: result.link,
                    googleSearchLink: result.image.contextLink,
                  }));
                  return places;
                } catch (error) {
                  if (error.response && error.response.status === 429) {
                    // Retry after waiting exponentially increasing time
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, 4 - retries) * 1000));
                    retries--;
                  } else {
                    throw error; // Re-throw other errors
                  }
                }
              }
            } catch (error) {
              console.error('Error fetching images:', error);
              return [];
            }
          });
  
          const allPlaces = await Promise.all(placesPromises);
          const flattenedPlaces = allPlaces.flat();
          setPlaceData(flattenedPlaces);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    }
    fetchData();
  }, [country, lat, long]);


  async function searchImages(query, count) {
    const apiKey = 'AIzaSyDjIZcNffL1t7GoEjA20jKNc5XSU9Ky2_E';
    const cx = '631d1d1a0d5d34b4d';
    const searchType = 'image';

    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&searchType=${searchType}&num=${count}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const imageResults = response.data.items.map(item => ({
        title: item.title,
        link: item.link,
        image: item.image,
      }));
      return imageResults;
    } catch (error) {
      console.error('Error searching images:', error);
      return [];
    }
  }

  async function addToRecentPlaces(place) {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const db = getDatabase();
      const recentSearchesRef = ref(db, `users/${userId}/recentSearches`);
  
      try {
        // Fetch the user's recent places
        const snapshot = await get(recentSearchesRef);
        let recentPlaces = [];
        if (snapshot.exists()) {
          recentPlaces = snapshot.val();
        }
  
        // Add the latest click to the recent places array
        recentPlaces.push(place);
  
        // Limit the array to the last three clicks
        recentPlaces = recentPlaces.slice(-3);
  
        // Update the recent places in the database
        await set(recentSearchesRef, recentPlaces);
  
      } catch (error) {
        console.error('Error adding recent search:', error);
      }
    }
  }  

  return (
    <SuggestedPlacesContainer>
      <MainTextContainer>
        <MainText>
          Discover the top <MainTextItalicized>activites</MainTextItalicized>
        </MainText>
        <Divider></Divider>
      </MainTextContainer>

      <SuggestedPlacesWrapper>
        {placeData.map(place => (
          <SuggestedPlaceContainer
            key={place.imageSrc}
            href={place.googleSearchLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => addToRecentPlaces(place)}
          >
            <SuggestedPlaceImage src={place.imageSrc} alt={place.title} />
            <SuggestedPlaceTitle>{place.title}</SuggestedPlaceTitle>
          </SuggestedPlaceContainer>
        ))}
      </SuggestedPlacesWrapper>
    </SuggestedPlacesContainer>
  );
};

export default SuggestedPlaces;