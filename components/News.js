import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const LatestNewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10vw;
`;

const MainTextContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const MainText = styled.div`
  padding-right: 28%;
  justify: 1;
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

const NewsContainer = styled.div`
  padding-top: 5vw;
  display: flex;
`;

const LeftSide = styled.div`
  flex: 1;
  padding-right: 2vw;
`;

const RightSide = styled.div`
  flex: 2;
`;

const LargeNewsItem = styled.div`
  background-color: #f9f9f9;
  padding: 2vw;
  margin-bottom: 1vw;
  height: auto;
  border-radius: 1vw;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SmallNewsItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  padding: .5vw;
  border-radius: 1vw;
  margin-bottom: 1vw;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const LargeNewsImage = styled.img`
  width: 100%;
  max-height: 15vw;
  border-radius: 1vw;
`;

const SmallNewsImage = styled.img`
  width: 9vw;
  height: 7vw;
  object-fit: cover;
  border-radius: 1vw;
  margin-right: 3vw;
`;

const LargeNewsHeader = styled.div`
  padding-top: 1vw;
  margin-left: 1vw;
  margin-right: 1vw;
  font-size: 1.5vw;
  margin-bottom: .5vw;
  color: black;
  transition: color 0.3s;
  &:hover {
    color: #333;
  }
`;

const LargeNewsDescription = styled.div`
  font-size: 0.8vw;
  margin-left: 1vw;
  color: #555;
  margin-top: 0.5vw;
  max-height: 6vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal; /* Allow wrapping for multiple lines */
`;

const NewsHeader = styled.div`
  margin-right: 3vw;
  font-size: 1vw;
  margin-bottom: .5vw;
  color: black;
  transition: color 0.3s;
  &:hover {
    color: #333;
  }
  text-decoration: none;
`;

const LatestNews = ({ country }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (country) {
        const newsResults = await searchImages(`${country} (current events)`, 8);
        setNewsData(newsResults.map(result => ({
          title: result.title,
          imageSrc: result.link,
          googleSearchLink: result.image.contextLink,
          firstTwoSentences: result.snippet.split('.').slice(0, 3).join('.') + '.',
        })));
      }
    }

    fetchData();
  }, [country]);

  async function searchImages(country, count) {
    const apiKey = 'AIzaSyAkn1b3j9ldUfqrrbO0zVGbhOgWySsZFA8';
    const cx = '631d1d1a0d5d34b4d';
    const searchType = 'image';
    const site = "nytimes.com";

    const url = `https://www.googleapis.com/customsearch/v1?q=${country}&cx=${cx}&searchType=${searchType}&num=${count}&key=${apiKey}&siteSearch=${site}`;


    try {
      const response = await axios.get(url);
      setNewsData(response.data.items.map(item => ({
        title: item.title,
        link: item.link,
        image: item.image,
        snippet: item.snippet
      })));
      return response.data.items;
    } catch (error) {
      console.error('Error searching images:', error);
      return [];
    }
  }

  // Make api call to news api
  async function getNewsData(country) {
    setLoading(true); // Set loading boolean to true so that we know to show loading text

    try {
      // Make news api call using axios with the provided country name
      const resp = await axios.get(`https://newsapi.org/v2/everything?q=+${country}&language=en&sortBy=relevancy&pageSize=7&apiKey=46ecdb13102a4267b2efe3cb27c38a2d&pageSize=10`);
      setNewsData(resp.data.articles); // Update state with the fetched news articles
    } catch (error) {
      console.error('Error fetching news:', error);
    }

    setLoading(false); // Set loading boolean to false so that we know to show news articles
  }

  useEffect(() => {
    searchImages(); // Call the getNewsData function when the component mounts or when the country prop changes
  }, [country]);

  return (
    <LatestNewsContainer>
      <MainTextContainer>
        <Divider></Divider>
        <MainText>
          Get in touch with the <MainTextItalicized>latest news</MainTextItalicized>
        </MainText>
      </MainTextContainer>
      
      <NewsContainer>
        <LeftSide>
            {newsData.slice(0,2).map((news, index) => (
              <LargeNewsItem>
                <LargeNewsImage src={news.imageSrc} alt={news.title} />
                <a key={index} href={news.googleSearchLink} target="_blank" rel="noopener noreferrer">
                 <LargeNewsHeader>{news.title}</LargeNewsHeader>
                </a>
                  <LargeNewsDescription>{news.firstTwoSentences}</LargeNewsDescription>
              </LargeNewsItem>
          ))}
        </LeftSide>
        <RightSide>
          {newsData.slice(2, 10).map((news, index) => (
            <a key={index} href={news.googleSearchLink} target="_blank" rel="noopener noreferrer">
              <SmallNewsItem>
                <SmallNewsImage src={news.imageSrc} alt={news.title} />
                  <NewsHeader>{news.title}</NewsHeader>
              </SmallNewsItem>
            </a>
          ))}
        </RightSide>
      </NewsContainer>
    </LatestNewsContainer>
  );
};

export default LatestNews;
