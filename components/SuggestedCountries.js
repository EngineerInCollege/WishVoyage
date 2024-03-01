import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from "next/router";

/* The code defines a footer component responsible for rendering a carousel of suggested countries.
*  It includes country information such as name, background image, and description within each
*  carousel slide. Users can navigate through the carousel using arrow buttons (PrevButton and NextButton) 
*  to view different suggested countries. Also , clicking the "Explore" button directs users to the
*  corresponding destination page (using useRouter). The component uses a useState hook to manage
*  the current index of the displayed country.
*/

const SuggestedCountriesContainer = styled.div`
    font-family: arial;
    padding-top: 3vw;
    padding-left: 6vw;
    padding-right: 6vw;
    padding-bottom: 10vw;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    position: relative; 
`

const CarouselWrapper = styled.div`
    position: relative;
    width: 75%; 
`

const CarouselButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 2vw;
    color: white;
    outline: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    opacity: 50%;
`

const CarouselContainer = styled.div`
    display: flex;
    overflow-x: hidden; 
    background-color: #f0f0f0;
    border-radius: 3vw;
    margin-bottom: 2vw;
    margin-top: 2vw;
    height: 30vw;
    position: relative;

    &:hover ${CarouselButton} {
        opacity: 1;
    }
`

const CountryBackground = styled.div`
    flex: 1;
    position: relative;
    background-image: url(${({ imageSrc }) => imageSrc});
    background-size: cover;
    background-position: center;
    color: white;
`

const CountryContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`

const CountryButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1vw;
    color: white;
    outline: none;
    border-radius: 1vw;
    padding: 1vw 2vw;
    margin-top: 1vw;
    backdrop-filter: blur(.2vw);
    background: linear-gradient(rgba(255, 255, 255, .2), rgba(255, 255, 255, 0.2)), rgba(0, 0, 255, 0.1);
`

const CountryName = styled.div`
    font-size: 5vw;
    margin-bottom: 1vw;
    font-family: Garamond;
    font-style: italic;
`

const CountryDescription = styled.div`
    font-size: 1vw;
    font-family: arial;
    margin-bottom: 1vw;
`

const NextButton = styled(CarouselButton)`
    right: 2%;
`

const PrevButton = styled(CarouselButton)`
    left: 2%;
`

const Footer = () => {
    const router = useRouter();

    function goToWantedPage(string) {
        router.push(`${string}`);
    }

    const [currentCountryIndex, setCurrentCountryIndex] = useState(0);

    const suggestedCountriesData = [
        {
            id: 1,
            name: 'Africa',
            imageSrc: '/backgrounds/africabackgroundimage.jpg',
            description: 'Explore the country with the most diverse wildlife and stunning natural wonders in Africa.',
            location: "/destinations/africa",
        },
        {
            id: 2,
            name: 'Asia',
            imageSrc: '/backgrounds/asiabackgroundimage.jpg',
            description: 'Explore the continent known for its vibrant cultures, ancient traditions, and breathtaking landscapes in Asia.',
            location: '/destinations/asia',
        },
        {
            id: 3,
            name: 'Caribbean Islands',
            imageSrc: '/backgrounds/caribbeanbackgroundimage.jpg',
            description: 'Dive into the paradise of turquoise waters, white sandy beaches, and laid-back island vibes in the Caribbean Islands.',
            location: '/destinations/caribbean',
        },
        {
            id: 4,
            name: 'Central America',
            imageSrc: '/backgrounds/centralamericabackgroundimage.jpg',
            description: 'Embark on an adventure through lush rainforests, ancient ruins, and vibrant cultures in Central America.',
            location: '/destinations/central-america',
        },
        {
            id: 5,
            name: 'Europe',
            imageSrc: '/backgrounds/europebackgroundimage.jpg',
            description: 'Discover the charm of historic cities, awe-inspiring architecture, and rich cultural heritage across the diverse landscapes of Europe.',
            location: '/destinations/europe',
        },
        {
            id: 6,
            name: 'Middle East',
            imageSrc: '/backgrounds/middleeastbackgroundimage.jpg',
            description: 'Immerse yourself in the fascinating blend of ancient history, modern innovation, and vibrant cultures in the Middle East.',
            location: '/destinations/middle-east',
        },
        {
            id: 7,
            name: 'North America',
            imageSrc: '/backgrounds/northamericabackgroundimage.jpg',
            description: 'Experience the natural beauty, bustling cities, and diverse cultures of the vast continent of North America.',
            location: '/destinations/north-america',
        },
        {
            id: 8,
            name: 'South America',
            imageSrc: '/backgrounds/southamericabackgroundimage.jpg',
            description: 'Journey through the breathtaking landscapes, vibrant cities, and diverse ecosystems of South America.',
            location: '/destinations/south-america',
        },
    ];

    const handleNext = () => {
        setCurrentCountryIndex((prevIndex) => (prevIndex + 1) % suggestedCountriesData.length);
    };

    const handlePrev = () => {
        setCurrentCountryIndex((prevIndex) => (prevIndex - 1 + suggestedCountriesData.length) % suggestedCountriesData.length);
    };

    // Get the current country data based on the index
    const currentCountry = suggestedCountriesData[currentCountryIndex];

    return (
        <SuggestedCountriesContainer>
            <CarouselWrapper>
                <CarouselContainer>
                    <CountryBackground imageSrc={currentCountry.imageSrc}>
                        <CountryContent>
                            <CountryName>{currentCountry.name}</CountryName>
                            <CountryDescription>{currentCountry.description}</CountryDescription>
                            <CountryButton onClick={() => goToWantedPage(currentCountry.location)}>Explore {currentCountry.name}</CountryButton>
                        </CountryContent>
                    </CountryBackground>
                    <PrevButton onClick={handlePrev}>&#9664;</PrevButton>
                    <NextButton onClick={handleNext}>&#9654;</NextButton>
                </CarouselContainer>
            </CarouselWrapper>
        </SuggestedCountriesContainer>
    );
};

export default Footer;
