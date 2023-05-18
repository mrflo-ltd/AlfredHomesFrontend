import styled, { css } from 'styled-components/macro';
import { triangle } from 'polished';
import { fontFamily } from '../styles/typography';
import { white, red } from '../styles/colors';

export const defaultButtonStyles = css`
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  appearance: none;
  border-radius: 0;
  background-color: transparent;
  cursor: pointer;
  color: inherit;
`;

const DefaultButton = styled.button`
  ${defaultButtonStyles};

  padding: 8px 24px;
  text-align: center;
  font-family: ${fontFamily.text};
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

export const PrimaryButton = styled(DefaultButton)`
  color: ${white};
  border: 1px solid ${red};
  background-color: ${red};
`;

export const SecondaryButton = styled(DefaultButton)`
  color: ${white};
  border: 1px solid ${white};
`;

export const CloseButton = styled.button<{
  width?: string;
  height?: string;
  lineWidth?: string;
  padding?: string;
  color?: string;
}>`
  ${defaultButtonStyles};

  position: absolute;
  width: ${(props) => props?.width || '32px'};
  height: ${(props) => props?.height || '32px'};
  padding: ${(props) => props?.padding || '6px'};

  &:before,
  &:after {
    position: absolute;
    width: ${(props) => props?.lineWidth || '20px'};
    height: 1px;
    background-color: ${(props) => props?.color || white};
  }

  &:before,
  &:after {
    display: block;
    content: '';
  }

  &:before {
    top: 10px;
    transform: rotate(-45deg);
  }

  &:after {
    top: 10px;
    transform: rotate(45deg);
  }
`;

export const ContactButton = styled(PrimaryButton)`
  position: absolute;
  right: 36px;
  bottom: 36px;

  @media only screen and (max-width: 768px) {
    right: auto;
    left: 36px;
    display: none;
  }

  @media only screen and (max-width: 480px) {
    right: auto;
    left: 24px;
    bottom: 16px;
  }
`;

export const FallbackContactButton = styled(ContactButton)`
  display: none;
  position: static;
  margin-top: 36px;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

export const SkipButton = styled(SecondaryButton)`
  position: absolute;
  right: 50%;
  bottom: 36px;
  background-color: rgba(0, 0, 0, 0.2);
  transform: translateX(50%);

  @media only screen and (max-width: 768px) {
    right: 36px;
    transform: none;
  }

  @media only screen and (max-width: 480px) {
    right: 16px;
    bottom: 16px;
  }
`;

export const WatchVideoButton = styled.button`
  ${defaultButtonStyles};

  width: 64px;
  height: 64px;
  margin-top: 32px;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);

  @media only screen and (max-width: 1024px) {
    margin-top: 32px;
  }

  @media only screen and (max-width: 768px) {
    width: 48px;
    height: 48px;
    margin-top: 24px;
  }

  @media only screen and (max-width: 480px) {
    width: 32px;
    height: 32px;
    margin-top: 16px;
  }

  span {
    display: block;
    ${triangle({
      pointingDirection: 'right',
      width: '24px',
      height: '24px',
      foregroundColor: red,
    })};

    @media only screen and (max-width: 768px) {
      ${triangle({
        pointingDirection: 'right',
        width: '18px',
        height: '18px',
        foregroundColor: red,
      })};
    }

    @media only screen and (max-width: 480px) {
      ${triangle({
        pointingDirection: 'right',
        width: '12px',
        height: '12px',
        foregroundColor: red,
      })};
    }
  }
`;
