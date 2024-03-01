import React from 'react';
import styled from 'styled-components';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, writeUserData } from "../firebase/firebaseConfig";

/* This codes defines a component for signing up, which renders a sign-up section with styled
*  components. Clicking the sign up button will trigger the firebase google account authentication
   pop-up.
*/

const SignUpContainer = styled.div`
  padding-top: 5vw;
  padding-bottom: 5vw;
  background-color: #f7f4f2;
  color: #242323;
  width: 100%;
`;

const TextAndButtonContainer = styled.div`
    padding-left: 12vw;
`

const SignUpText = styled.div`
    color: #d6d4d4
    font-family: serif;
    font-size: 2vw;
`
const SignUpAccountText = styled.div`
    font-family: serif;
    font-size: 2vw;
    color: #cf532d;
    span {
        font-style: italic;
    }
    padding-bottom: 1vw;
`
const SignUpButton = styled.button`
  padding: 1vw 3vw;
  background-color: transparent;
  color: #cf532d;
  border: .2vw solid #cf532d;
  border-radius: 1vw;
  font-size: 1vw;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #242323;
    border: .2vw solid #242323;
  }
`;

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

const SignUp = () => {
  return (
    <SignUpContainer>
        <TextAndButtonContainer>
        <SignUpText>
            Want to save your Adventures and news?
        </SignUpText>
        <SignUpAccountText>Sign up for an <span>account</span>.</SignUpAccountText>
      <SignUpButton onClick={handleGoogle}>Sign Up</SignUpButton>
        </TextAndButtonContainer>
    </SignUpContainer>
  );
};

export default SignUp;
