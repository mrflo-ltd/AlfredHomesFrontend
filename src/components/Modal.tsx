import React from 'react';
import styled from 'styled-components/macro';
import { Portal } from '../components/Portal';
import { useEscKeydown } from '../hooks/useEscKeydown';
import { black } from '../styles/colors';

const Wrapper = styled.div`
  position: relative;
`;

export const Overlay = styled.div<{
  $backgroundColor: string;
  overlayZIndex?: number;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${(props) => props?.overlayZIndex || 5};
  background-color: ${(props) => props.$backgroundColor};
`;

type ModalProps = {
  overlayBackgroundColor?: string;
  overlayZIndex?: number;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({
  onClose,
  overlayBackgroundColor = black,
  overlayZIndex = 5,
  children,
}: ModalProps) => {
  useEscKeydown(onClose);

  return (
    <Portal>
      <Wrapper>
        <Overlay
          $backgroundColor={overlayBackgroundColor}
          overlayZIndex={overlayZIndex}
        />

        {children}
      </Wrapper>
    </Portal>
  );
};
