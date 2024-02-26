import React from 'react';
import styled from 'styled-components';

const LatestNewsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px; 
`;

const LeftSide = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const RightSide = styled.div`
  flex: 1;
`;

const LargeNewsItem = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
`;

const SmallNewsItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const LargeNewsImage = styled.img`
  width: 100%;
  max-height: 200px; /* Adjust as needed */
  border-radius: 8px;
  margin-bottom: 10px;
`;

const SmallNewsImage = styled.img`
  width: 100px; /* Adjust as needed */
  height: 100px; /* Adjust as needed */
  object-fit: cover;
  border-radius: 8px;
  margin-right: 10px;
`;

const NewsHeader = styled.h2`
  font-size: 18px;
  margin-bottom: 5px;
`;

const NewsDescription = styled.p`
  font-size: 14px;
`;

const LatestNews = ({ news }) => {
  return (
    <LatestNewsContainer>
      <LeftSide>
        <LargeNewsItem>
          <LargeNewsImage src={news.image} alt="News" />
          <NewsHeader>{news.header}</NewsHeader>
          <NewsDescription>{news.description}</NewsDescription>
        </LargeNewsItem>
      </LeftSide>
      <RightSide>
        {news.relatedNews.map((item, index) => (
          <SmallNewsItem key={index}>
            <SmallNewsImage src={item.image} alt={item.header} />
            <div>
              <NewsHeader>{item.header}</NewsHeader>
              <NewsDescription>{item.description}</NewsDescription>
            </div>
          </SmallNewsItem>
        ))}
      </RightSide>
    </LatestNewsContainer>
  );
};

export default LatestNews;
