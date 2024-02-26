import React from 'react';
import styled from 'styled-components';
import { useRouter } from "next/router";

const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  padding-top: 5vw;
  padding-left: 3vw;
  padding-right: 3vw;
  padding-bottom: 4vw;
  bottom: 0;
  width: 100%;
`;

const MadeBy = styled.p`
  margin: 0;
`;

const Footer = () => {
  const router = useRouter();

  const goToMainPage = () => {
    router.push('/');
  };

  return (
    <FooterContainer>
      <MadeBy>Made by a student at Penn State</MadeBy>
      <a onClick={goToMainPage}>WishVoyage</a>
    </FooterContainer>
  );
};

export default Footer;
