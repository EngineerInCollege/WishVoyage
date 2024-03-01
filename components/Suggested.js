import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { auth, db } from '../firebase/firebaseConfig';
import { getDatabase, get, ref, set } from "firebase/database";

/* This code defines a component called SuggestedPlaces, which is responsible for
*  displaying suggested palces based on the provided country or latitude and longitude
* coordinates (if the region of the country is included in the Amadeus API allowed regions).
* The component fetches place data either by searching for images related to travel or vacation
* using the Google Custom Search API (to ensure that an image is returned) or by querying
* the Amadeus API for points of interest near the specified coordinates. It then renders
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

const SuggestedPlaces = ({ interest, country, lat, long }) => {
  const [placeData, setPlaceData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (interest || country || (lat || long)) {
        // Fetch images using searchImages function
        const imageResults = await searchImages(`${country} (travel OR vacation)`, 8);
        const placesFromImages = imageResults.map(result => ({
          title: result.title,
          imageSrc: result.link,
          googleSearchLink: result.image.contextLink,
        }));
  
        // Fetch places using Amadeus API
        let placesFromAmadeus = [];
        try {
          const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${lat}&longitude=${long}&radius=1&page%5Blimit%5D=4&page%5Boffset%5D=0`, {
            headers: {
              'Authorization': 'Bearer 8vh3754Z68zL2Qt23tGFiPibWlqW'
            }
          });
          placesFromAmadeus = response.data.data.map(place => ({
            title: place.name,
            // imageSrc: searchImages(place.name)[0].image,
            // googleSearchLink: searchImages(place.name)[0].link
          }));    
        } catch (error) {
          console.error('Error fetching places:', error);
        }

        const placesWithImages = [];
        for (const place of placesFromAmadeus) {
          // Fetch images for the place using a different API or service
          const imageResults = await searchImages(place.name, 1); // Assuming place.name contains the name of the location
          if (imageResults.length > 0) {
            const imageUrl = imageResults[0].image; // Get the URL of the top image
            const googleSearch = imageResults[0].link;
            placesWithImages.push({
              ...place,
              imageSrc: imageUrl, // Assign the image URL to imageSrc
              googleSearchLink: googleSearch, // Adjust based on your requirements
            });
          }
        }

        // Combine data from both sources
        const allPlaces = [...placesFromImages, ...placesFromAmadeus];
  
        // Set the combined data to placeData state
        setPlaceData(allPlaces);
      } else {
        // Handle case when country or lat/long is not provided
        console.error('Country name and either latitude or longitude are required.');
      }
    }
  
    fetchData();
  }, [country, lat, long])

  async function searchImages(query, count) {
    const apiKey = 'AIzaSyB_ZtR__g6776b5mOATf8XLg_NGufwOHto';
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
          Get away, right <MainTextItalicized>away</MainTextItalicized>
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
