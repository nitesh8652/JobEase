import { Download } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';

const Button = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button className="button" type="button" onClick={onClick}>
        <span className="button__text">Download Your Resume</span>
        <span className="button__icon">
            <Download className="text-white w-5 h-5" />
        </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    width: 715px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #17795E;
    background-color: #209978;
    overflow: hidden;
    border-radius: 6px;
  }

  .button, .button__icon, .button__text {
    transition: all 0.3s ease-in-out;
  }

  .button .button__text {
    color: #fff;
    font-weight: 600;
    z-index: 1;
  }

  .button .button__icon {
    position: absolute;
    right: 0;
    height: 100%;
    width: 40px;
    background-color: #17795E;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button:hover {
    background: #17795E;
  }

  .button:hover .button__text {
    color: transparent;
  }

  .button:hover .button__icon {
    width: 100%;
  }

  .button:active .button__icon {
    background-color: #146c54;
  }

  .button:active {
    border: 1px solid #146c54;
  }
`;

export default Button;
