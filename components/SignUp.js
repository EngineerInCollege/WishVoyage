import React from 'react';
import styled from 'styled-components';

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
  border: 2px solid #cf532d;
  border-radius: 1vw;
  font-size: 1vw;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #242323;
    border: 2px solid #242323;
  }
`;

const SignUp = () => {
  return (
    <SignUpContainer>
        <TextAndButtonContainer>
        <SignUpText>
            Want to save your Adventures and news?
        </SignUpText>
        <SignUpAccountText>Sign up for an <span>account</span>.</SignUpAccountText>
      <SignUpButton>Sign Up</SignUpButton>
        </TextAndButtonContainer>
    </SignUpContainer>
  );
};

export default SignUp;
