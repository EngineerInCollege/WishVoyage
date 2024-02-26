import Head from "next/head";
import styled from 'styled-components';
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import WelcomeBack from "@/components/WelcomeBack";
import Suggested from "@/components/Suggested";
import Footer from "@/components/Footer";
import News from "@/components/News";

const PageContainer = styled.div`
  width: 100%;
`;

const BackgroundImage = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  background-image: url("/middleeastbackgroundimage.jpg");
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
  font-size: 60px;
`;

const LargeText = styled.div`
  font-weight: bold;
  
`;

const SmallText = styled.div`
  font-style: italic;
  font-size: 20px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const temporaryNews = {
  mainNews: {
    image: '/tempnews.jpg',
    header: 'Main News Header',
    description: 'Description of the main news.',
  },
  relatedNews: [
    {
      image: '/tempnews.jpg',
      header: 'Related News Header 1',
      description: 'Description of the first related news.',
    },
    {
      image: '/tempnews.jpg',
      header: 'Related News Header 2',
      description: 'Description of the second related news.',
    },
    {
      image: '/tempnews.jpg',
      header: 'Related News Header 3',
      description: 'Description of the third related news.',
    },
  ],
};


export default function Asia() {
  const isLoggedIn = true; // Placeholder value, replace with actual logic
  const userName = "John Doe"; // Placeholder value, replace with actual user name

  return (
    <>
      <Head>
        <title>WishVoyage - Asia</title>
        <meta name="description" content="Explore Asia with WishVoyage" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <Navbar />
        <BackgroundImage>
          <OverlayText>
            <LargeText>Middle East</LargeText>
            <SmallText>Explore the wonders of the Middle East</SmallText>
          </OverlayText>
        </BackgroundImage>
        <MainContent>
          <Suggested backgroundColor="white"/>
          <News news={temporaryNews}></News>
        </MainContent>
        <Footer />
      </PageContainer>
    </>
  );
}
