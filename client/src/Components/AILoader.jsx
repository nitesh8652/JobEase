import React from "react";
import styled from "styled-components";
import Loader from './Buttons/AIloader.jsx';

const AIOverlay = () => {
  return (
    <Overlay>
      <Loader />
    </Overlay>
  );
};

export default AIOverlay;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;

  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(2px);

  display: flex;
  align-items: center;
  justify-content: center;

  pointer-events: all; /* blocks clicks */
`;
