import React from 'react';
import styled from 'styled-components';
import { useRouter } from "next/router";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, writeUserData } from "../firebase/firebaseConfig";

/* This is the footer component for the website. It includes sections for the logo, contact
* info, sign-up, and navigation links to destinations and interests. Each section is styled
* seperately for control over styling.
*/

const FooterContainer = styled.footer`
  font-family: arial;
  background-color: #242323;
  color: #d6d4d4;
  font-size: 1vw;
  padding-top: 4vw;
  padding-left: 6vw;
  padding-right: 6vw;
  padding-bottom: 7vw;
  bottom: 0;
  display: flex;
`;

const LeftContainer = styled.div`
  flex: 1;
`;

const RightContainer = styled.div`
  padding-top: 2vw;
  padding-left: 6vw;
  flex: 2;
`;

const Divider = styled.div`
  width: .1vw;
  background-color: #969493;
`;

const Logo = styled.p`
  font-size: 2vw;
  cursor: pointer;
  span {
    font-weight: bold;
  }
`;

const Contact = styled.div`
  color: #969493;
`;

const ContactUs = styled.p`
  color: #d6d4d4;
  padding-top: 2vw;
  font-size: 2vw;
  font-family: serif;
`;

const ContactInfoList = styled.ul`
  padding-top: .5vw;
`;

const ContactInfo = styled.div`
  padding-top: .5vw;
  padding-left: 2vw;
  display: flex;
  flex-direction: column;
`;

const Links = styled.a`
  color: #969493;
`;

const SignUp = styled.div`
  padding-top: 3vw;
  padding-bottom: .5vw;
  font-size: 1vw;
  font-family: arial;
  color: #d6d4d4;
`;

const SignUpButton = styled.button`
  font-size: 1vw;
  font-family: arial;
  padding: 1vw 2vw;
  background-color: #d6d4d4;
  border: none;
  border-radius: 1vw;
  cursor: pointer;
  transition: background-color 0.3s ease; 

  &:hover {
    background-color: #969493;
  }
`;

const NavigationFooter = styled.div`
  padding-top: 3vw;
  display: flex;
`;

const DestinationsHolder = styled.div`
  flex: 1;
`;

const InterestsHolder = styled.div`
  flex: 2;
`;

const Destinations = styled.div`
  padding: .25vw 1vw;
  font-size: 1vw;
  color: #969493;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #f0f0f0;
  }
`;

const SectionTitle = styled.div`
  font-size: 1.5vw;
  font-family: serif;
`;

const destinationsItems = [
    { label: 'Africa', href: '/destinations/africa' },
    { label: 'Asia', href: '/destinations/asia' },
    { label: 'Caribbean Islands', href: '/destinations/caribbean' },
    { label: 'Central America', href: '/destinations/central-america' },
    { label: 'Europe', href: '/destinations/europe' },
    { label: 'Middle East', href: '/destinations/middle-east' },
    { label: 'North America', href: '/destinations/north-america' },
    { label: 'South America', href: '/destinations/south-america' },
];

const interestsItems = [
    { label: 'Art & Culture', href: '/art-culture' },
    { label: 'Food & Drink', href: '/food-drink' },
    { label: 'History', href: '/history' },
    { label: 'Wildlife & Nature', href: '/wildlife-nature' },
];

const Footer = () => {
  const router = useRouter();

  function goToWantedPage(string) {
    router.push(`${string}`);
  }

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem('user', JSON.stringify(result.user)); // Save user data to local storage
        
      const { uid, displayName, email } = result.user;
      writeUserData(uid, displayName, email);
      
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };  

  return (
    <FooterContainer>
      <LeftContainer>
        <Logo onClick={() => goToWantedPage("/")}><span>Wish</span>Voyage</Logo>
        <Contact>
          <ContactUs>Contact us</ContactUs>
          Question about our trips?
          <ContactInfoList>
            <ContactInfo>
              <span>Call us at <Links href="tel:+1234567890">+1 123 456 7890</Links></span>
            </ContactInfo>
            <ContactInfo>
              <span>Send us a <Links href="mailto:example@example.com">message</Links></span>
            </ContactInfo>
          </ContactInfoList>
        </Contact>
        <SignUp>Sign up and save your journey</SignUp>
        <SignUpButton onClick={handleGoogle}>Subscribe</SignUpButton>
      </LeftContainer>

      <Divider />

      <RightContainer>
        <NavigationFooter>
          <DestinationsHolder>
            <SectionTitle>Destinations</SectionTitle>
            <ul>
              {destinationsItems.map((item, index) => (
                <Destinations onClick={() => goToWantedPage(item.href)} key={index}>
                  {item.label}
                </Destinations>
              ))}
            </ul>
          </DestinationsHolder>
          <InterestsHolder>
            <SectionTitle>Interests</SectionTitle>
            <ul>
              {interestsItems.map((item, index) => (
                <Destinations onClick={() => goToWantedPage(item.href)} key={index}>
                  {item.label}
                </Destinations>
              ))}
            </ul>
          </InterestsHolder>
        </NavigationFooter>
      </RightContainer>
    </FooterContainer>
  );
};

export default Footer;
