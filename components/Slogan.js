import React from 'react';
import styled, { keyframes } from 'styled-components';

/* This code defines the animated slogan seen on the front page of the website. It defines
*  a keyframe animation to simulate a typing effect by gradually increasing the width of the
*  border from 0 to 100% over 3 seconds, giving the appearance of text being typed. The blinkCaret
*  defines a keyfram animation to create a blinking caret effect by alternating the border
*  color between transparent and white.
*/

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent }
  50% { border-color: white; }
`;

const Slogan = styled.div`
  font-size: 3vw;
  font-family: 'serif';
  overflow: hidden;
  white-space: nowrap;
  border-right: .1vw solid transparent;
  animation: ${typing} 3s steps(20, end), ${blinkCaret} 0.5s step-end infinite;
`;

const ItalicizedSpan = styled.span`
  font-style: italic;
`;

const AnimatedSlogan = () => {
    return (
      <Slogan><ItalicizedSpan>Curiosity:</ItalicizedSpan> your gateway to exploration</Slogan>
    );
};

export default AnimatedSlogan;
