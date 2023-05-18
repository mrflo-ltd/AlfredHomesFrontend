import styled from 'styled-components/macro';
import { black } from '../styles/colors';

const Chevron = styled.div<{
  width?: string;
  height?: string;
  color?: string;
  borderThickness?: string;
}>`
  display: block;
  width: ${(props) => props?.width || '24px'};
  height: ${(props) => props?.height || '24px'};
  border-top: ${(props) => props?.borderThickness || '1px'} solid
    ${(props) => props?.color || black};
  border-right: ${(props) => props?.borderThickness || '1px'} solid
    ${(props) => props?.color || black};
`;

export const ChevronLeft = styled(Chevron)`
  transform: rotate(225deg);
`;

export const ChevronRight = styled(Chevron)`
  transform: rotate(45deg);
`;

export const ChevronUp = styled(Chevron)`
  transform: rotate(135deg);
`;

export const ChevronDown = styled(Chevron)`
  transform: rotate(-45deg);
`;
