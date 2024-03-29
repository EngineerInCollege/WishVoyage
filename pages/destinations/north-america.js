import Head from "next/head";
import styled from 'styled-components';
import Navbar from "@/components/Navbar";
import Suggested from "@/components/Suggested";
import Footer from "@/components/Footer";
import News from "@/components/News";
import Activities from "@/components/Activites";
import React, { useState } from 'react';

/* The page for North America. Includes a suggested places and news container.
*/

const PageContainer = styled.div`
  width: 100%;
`;

const BackgroundImage = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  background-image: url("/backgrounds/northamericabackgroundimage.jpg");
  background-attachment: fixed; 
  background-size: cover;
  background-position: center;
`;

const OverlayText = styled.div`
  font-family: 'Garamond';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  font-size: 5vw;
`;

const LargeText = styled.div`
  font-weight: bold;
  
`;

const SmallText = styled.div`
  font-style: italic;
  font-size: 1vw;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 1vw;
`;

export default function NorthAmerica() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Head>
        <title>WishVoyage - North America</title>
        <meta name="description" content="Explore North America with WishVoyage" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <Navbar user={user} setUser={setUser}/>
        <BackgroundImage>
          <OverlayText>
            <LargeText>North America</LargeText>
            <SmallText>Discover the magic of North America</SmallText>
          </OverlayText>
        </BackgroundImage>
        <MainContent>
          <Suggested country="north america"/>
          <Activities lat="40.730610" long="-73.935242"></Activities>
          <News country="north america"></News>
        </MainContent>
        <Footer />
      </PageContainer>
    </>
  );
}
