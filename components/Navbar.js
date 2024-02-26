import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from "next/router"

const Dropdown = ({ title, items }) => {

  const router = useRouter(); // Navigates to pages?
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

  function goToWantedPage(string) { // Fix this
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

const Navbar = () => {

  const destinationsItems = [
    { label: 'Africa', href: '/africa' },
    { label: 'Asia', href: '/asia' },
    { label: 'Caribbean Islands', href: '/caribbean' },
    { label: 'Central America', href: '/central-america' },
    { label: 'Europe', href: '/europe' },
    { label: 'Middle East', href: '/middle-east' },
    { label: 'North America', href: '/north-america' },
    { label: 'South America', href: '/south-america' },
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
        <LogoBox><span>Wish</span>Voyage</LogoBox>
        <NavigationButtonHolder>
          <Dropdown title="Destinations" items={destinationsItems} />
          <Dropdown title="Interests" items={interestsItems} />
          <NavigationElement bold>Sign In</NavigationElement>
        </NavigationButtonHolder>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  position: fixed;
  z-index: 1;
  width: 90vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2vw;
`;

const LogoBox = styled.div`
  font-family: 'Arial';
  font-size: 24px;
  color: white;
  span {
    font-weight: bold;
  }
`;

const NavigationButtonHolder = styled.div`
  display: flex;
  gap: 5vw;
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
  top: calc(100% + 5px);
  left: 0;
  width: 150px;
  background-color: #fff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  list-style: none;
  display: ${({ showDropdown }) => (showDropdown ? 'block' : 'none')};
  transition: opacity 0.3s ease;
  opacity: ${({ showDropdown }) => (showDropdown ? 1 : 0)};
`;

const DropdownMenuItems = styled.a`
  display: block;
  padding: 8px 15px;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default Navbar;
