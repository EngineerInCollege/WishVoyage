import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from "next/router"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, writeUserData } from "../firebase/firebaseConfig";

/* This code is for the navigation bar, consisting of the website logo, navigation buttons
* for destinations and interests, and user authentication options (signing up or logging out).
* The re-routing is done with Next.js router (useRouter) and this also uses local storage to store
* user authentication state to maintain user sessions across page refreshes.
*/

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
  left: 45%;
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

  useEffect(() => {
    // Check local storage for user authentication state
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []); // Run only once on component mount

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
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('user'); // Remove user data from local storage
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
