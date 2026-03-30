import { Download } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';

const Button = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button className="button" type="button" onClick={onClick}>
        <span className="button__text">Download Your Resume</span>
        <span className="button__icon">
          <Download className="icon" />
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;

  .button {
    position: relative;
    width: 100%;
    max-width: 720px;
    height: 48px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #17795E;
    background-color: #209978;
    overflow: hidden;
    border-radius: 8px;
    margin: 0 auto;
  }

  .button,
  .button__icon,
  .button__text {
    transition: all 0.3s ease-in-out;
  }

  .button__text {
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    padding: 0 50px 0 16px;
    z-index: 1;
    text-align: center;
  }

  .button__icon {
    position: absolute;
    right: 0;
    height: 100%;
    width: 48px;
    background-color: #17795E;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    width: 18px;
    height: 18px;
    color: white;
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

  /* 📱 Mobile Improvements */
  @media (max-width: 640px) {
    .button {
      height: 44px;
      border-radius: 6px;
    }

    .button__text {
      font-size: 13px;
      padding: 0 45px 0 12px;
    }

    .button__icon {
      width: 44px;
    }

    .icon {
      width: 16px;
      height: 16px;
    }
  }
`;

export default Button;