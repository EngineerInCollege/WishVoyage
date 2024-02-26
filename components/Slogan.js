import React from 'react';
import styled, { keyframes } from 'styled-components';

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent }
  50% { border-color: white; }
`;

const Slogan = styled.div`
  font-size: 40px;
  font-family: 'Times';
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid transparent;
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
