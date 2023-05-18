import { transparentize } from 'polished';
import styled, { keyframes } from 'styled-components/macro';

const scaleIn = keyframes`
	from {
		transform: scale(0.8) rotate(-120deg);
		opacity: 0;
	}

	to {
		opacity: 1;
	}
`;

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }

	to {
		transform: rotate(360deg);
	}
`;

export const FullWidthLoaderWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const Wrapper = styled.div<{ size: number; color: string }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border-width: ${(props) => `${props.size / 12}px`};
  border-radius: 50%;
  border-style: solid;
  border-color: ${(props) => transparentize(0.5, props.color)};
  border-top-color: ${(props) => props.color};
  opacity: 0;
  animation: ${scaleIn} 200ms linear 1 forwards,
    ${spinner} 999ms 200ms linear infinite;
`;

type LoaderPropTypes = {
  size?: number;
  color?: string;
};

export const Loader = ({ color = '#fff', size = 24 }: LoaderPropTypes) => (
  <Wrapper color={color} size={size} />
);
