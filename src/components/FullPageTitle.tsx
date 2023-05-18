import React from 'react';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import { CONTACT_PATH } from '../global/pages';
import {
  ContactButton,
  SkipButton,
  WatchVideoButton,
} from '../components/Button';
import { MainTitle } from '../styles/typography';

import { VideoModal } from './VideoModal';

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 90px;

  @media only screen and (max-width: 1024px) {
    margin: 36px;
  }

  @media only screen and (max-width: 768px) {
    margin: 36px;
  }

  @media only screen and (max-width: 480px) {
    margin: 8px;
  }
`;

const Title = styled(MainTitle)`
  margin: 0;
  font-size: 56px;
  text-transform: uppercase;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: 32px;

  @media only screen and (max-width: 1024px) {
    font-size: 44px;
    line-height: 1.3;
    letter-spacing: 20px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 32px;
    line-height: 1.3;
    letter-spacing: 13px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 24px;
    line-height: 1.3;
    letter-spacing: 10px;
  }

  span {
    margin-left: 90px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Reel = styled.div<{ $backgroundUrl: string }>`
  position: relative;
  background: url(${(props) => props.$backgroundUrl}) no-repeat center center
    fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.35);
`;

type FullPageTitleProps = {
  title: string;
  backgroundUrl: string;
  videoUrl?: string;
  nextPagePath: string;
  style?: React.CSSProperties;
  onSkipClick?: () => void;
};

export const FullPageTitle = ({
  title,
  backgroundUrl,
  videoUrl,
  nextPagePath,
  onSkipClick,
  style,
}: FullPageTitleProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Reel
        $backgroundUrl={backgroundUrl}
        onClick={() => navigate(nextPagePath)}
      >
        <Overlay />
        <Container>
          <Title style={style}>{title}</Title>

          {videoUrl && (
            <WatchVideoButton
              onClick={(event) => {
                event.stopPropagation();
                setIsVideoPlaying(true);
              }}
            >
              <span />
            </WatchVideoButton>
          )}
        </Container>
      </Reel>

      {onSkipClick && (
        <SkipButton onClick={() => onSkipClick()}>Skip</SkipButton>
      )}

      {isVideoPlaying && videoUrl && (
        <VideoModal
          externalAnimationData={{
            title,
            mediaPath: videoUrl,
            name: '',
          }}
          onClose={() => setIsVideoPlaying(false)}
        />
      )}

      <ContactButton onClick={() => navigate(CONTACT_PATH)}>
        Contact
      </ContactButton>
    </React.Fragment>
  );
};
