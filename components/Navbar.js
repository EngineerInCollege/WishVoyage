import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from "next/router"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../pages/firebase/firebaseConfig";
import { signOut } from 'firebase/auth';


const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  font-size: 1vw;
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2vw;
  padding-bottom: 2vw;
  padding-left: 3vw;
  padding-right: 3vw;
  width: 100%;
  background: linear-gradient(to bottom, rgba(186, 181, 181, 0.5), rgba(128, 128, 128, 0));
  backdrop-filter: blur(.1vw);
`;

const LogoBox = styled.div`
  flex: 1;
  font-family: 'Arial';
  color: white;
  span {
    font-weight: bold;
  }
  cursor: pointer;
`;

const NavigationButtonHolder = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4vw;
  align-items: center;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 5vw;
  gap: 2vw;
`;

const NavigationElement = styled.div`
  font-family: 'Arial';
  color: white;
  position: relative;
  cursor: pointer;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};

  &:hover ul {
    display: block;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: calc(100% + 1vw);
  left: 0;
  width: 8vw;
  background-color: #fff;
  box-shadow: 0vw 1vw 1vw rgba(0, 0, 0, 0.1);
  padding: 1vw 0;
  list-style: none;
  display: ${({ showDropdown }) => (showDropdown ? 'block' : 'none')};
  transition: opacity 0.3s ease;
  opacity: ${({ showDropdown }) => (showDropdown ? 1 : 0)};
`;

const DropdownMenuItems = styled.a`
  display: block;
  padding: .5vw .5vw;
  font-size: .75vw;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Greetings = styled.div`
  font-family: 'Arial';
  color: white;
  position: relative;
`;

const Dropdown = ({ title, items }) => {

  const router = useRouter(); 
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    setIsOpen(false);
  };

  function goToWantedPage(string) {
    router.push(`${string}`);
  }

  return (
    <NavigationElement onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {title}
      <DropdownMenu
        showDropdown={isOpen}
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
      >
        {items.map((item, index) => (
          <DropdownMenuItems onClick={() => goToWantedPage(item.href)} key={index}>
            {item.label}
          </DropdownMenuItems>
        ))}
      </DropdownMenu>
    </NavigationElement>
  );
};

const Navbar = ({user, setUser}) => {
  const router = useRouter();

  function goToWantedPage(string) {
    router.push(`${string}`);
  }

  const handleGoogle = async (e) => {
    const provider = await new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user); // Set the user state after sign-in
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
      });
  };  

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear the user state after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  

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

  return (
    <Container>
      <Content>
      <LogoBox onClick={() => goToWantedPage("/")}>
          <span>Wish</span>Voyage
        </LogoBox>
        <NavigationButtonHolder>
          <Dropdown title="Destinations" items={destinationsItems} />
          <Dropdown title="Interests" items={interestsItems} />
        </NavigationButtonHolder>
        <UserContainer>
        {user ? (
            <>
              <Greetings>Hello, {user.displayName}</Greetings>
              <NavigationElement bold onClick={handleSignOut}>Sign Out</NavigationElement>
            </>
          ) : (
            <NavigationElement bold onClick={handleGoogle}>Sign In</NavigationElement>
          )}
        </UserContainer>
      </Content>
    </Container>
  );
}

export default Navbar;
