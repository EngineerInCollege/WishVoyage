import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styled from 'styled-components';
import React, { useState } from 'react';
const inter = Inter({ subsets: ["latin"] });
import Navbar from "@/components/Navbar";
import Slogan from "@/components/Slogan";
import SearchBar from "@/components/SearchBar";
import WelcomeBack from "@/components/WelcomeBack";
import Suggested from "@/components/Suggested";
import Footer from "@/components/Footer";
import SuggestedCountries from "@/components/SuggestedCountries";
import SignUp from "@/components/SignUp";

const ParentContainer = styled.div`
  width: 100%;
`

const BackgroundImage = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("/frontpageimage.jpg");
  background-size: cover;
  background-position: center;
`;

const OverlayText = styled.div`
  font-family: 'Arial';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 25px;
  text-align: center;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

export default function Home() {
  const isLoggedIn = true;
  const userName = "John Doe";
  const [user, setUser] = useState(null);

  return (
    <>
      <Head>
        <title>WishVoyage</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParentContainer>
      <Navbar user={user} setUser={setUser}/>
        <BackgroundImage>
          <OverlayText>
            Travel the world with WishVoyage.
            <Slogan/>
          </OverlayText>
        </BackgroundImage>
        <SearchBar/>
        <WelcomeBack user={user} />
        <MainContent>
          <Suggested></Suggested>
          <SuggestedCountries></SuggestedCountries>
          <SignUp></SignUp>
        </MainContent>
        <Footer></Footer>
      </ParentContainer>
    </>
  );
}
