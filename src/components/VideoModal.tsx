import React from 'react';
import styled from 'styled-components/macro';
import { opacify } from 'polished';
import Player from '@vimeo/player';

import { CloseButton } from '../components/Button';
import { Modal } from '../components/Modal';
import { MainTitle } from '../styles/typography';
import { white, greyDarker, black } from '../styles/colors';

const VimeoWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ModalContent = styled.div`
  position: fixed;
  padding: 64px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 64px;
  z-index: 36;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    padding: 36px;
    bottom: 36px;
  }

  @media only screen and (max-width: 480px) {
    padding: 24px;
    bottom: 24px;
  }
`;

const Title = styled(MainTitle)`
  position: relative;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.08;
  margin: 0 0 18px;
  color: ${black};
  text-transform: uppercase;
  letter-spacing: 12px;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
    position: static;
    margin-bottom: 18px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 18px;
    line-height: 1.3;
  }
`;

const ModalTitle = styled(Title)`
  position: static;
  margin: 36px 0;
  color: ${white};
`;

const ModalCloseButton = styled(CloseButton)`
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 37;
`;

export type VideoData = {
  title: string;
  mediaPath: string;
  name: string;
};

type VideoModalProps = {
  externalAnimationData: VideoData;
  onClose: () => void;
};

export const VideoModal = ({
  externalAnimationData,
  onClose,
}: VideoModalProps) => {
  const [player, setPlayer] = React.useState<Player | undefined>(undefined);

  const iframeRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (iframeRef?.current) {
      const player = new Player(iframeRef.current);
      setPlayer(player);
    }
  }, []);

  React.useEffect(() => {
    if (player) {
      player.on('ended', () => {
        onClose();
      });
    }
  }, [player, onClose]);

  return (
    <Modal
      overlayBackgroundColor={opacify(0.2, greyDarker)}
      overlayZIndex={35}
      onClose={onClose}
    >
      <ModalContent>
        <ModalTitle>{externalAnimationData.title}</ModalTitle>
        {externalAnimationData.mediaPath && (
          <VimeoWrapper>
            <iframe
              ref={iframeRef}
              src={externalAnimationData.mediaPath}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{
                width: '100%',
                height: '100%',
              }}
              title={externalAnimationData.name}
            ></iframe>
          </VimeoWrapper>
        )}
      </ModalContent>

      <ModalCloseButton onClick={onClose} />
    </Modal>
  );
};
