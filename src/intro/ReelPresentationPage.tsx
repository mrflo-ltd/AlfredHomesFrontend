import React from 'react';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import Player from '@vimeo/player';
import { NAVIGATION_PATH, REEL_PATH } from '../global/pages';
import { SecondaryButton } from '../components/Button';
import { Page } from '../components/Page';
import { getVideoUrl } from './data';
import { black } from '../styles/colors';
import { sendPageView } from '../utils/analyticsUtils';
import { getReel } from './intro.service';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background-color: ${black};
`;

const VimeoWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${black};
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  margin-bottom: 36px;
`;

const SkipButton = styled(SecondaryButton)`
  background-color: rgba(0, 0, 0, 0.2);
`;

declare global {
  interface Window {
    Vimeo: {
      Player: new (iframe: HTMLIFrameElement | null) => any;
    };
  }
}

export const ReelPresentationPage = () => {
  const [videoPath, setVideoPath] = React.useState<string>('');
  const [player, setPlayer] = React.useState<Player | undefined>(undefined);

  const navigate = useNavigate();

  sendPageView(REEL_PATH);

  const goToNavigation = React.useCallback(
    () => navigate(NAVIGATION_PATH),
    [navigate]
  );

  const iframeRef = React.useRef(null);

  React.useEffect(() => {
    getReel()
      .then((reelData) => {
        const videoPath = reelData?.textPage?.video || '';
        setVideoPath(videoPath);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useLayoutEffect(() => {
    if (iframeRef?.current) {
      const player = new Player(iframeRef.current);
      setPlayer(player);
    }
  }, []);

  React.useEffect(() => {
    document.title = 'Introduction film';
  }, []);

  React.useEffect(() => {
    if (player) {
      player.on('ended', () => {
        goToNavigation();
      });
    }
  }, [player, goToNavigation]);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <Page>
      <Wrapper>
        <VimeoWrapper>
          {videoPath && (
            <iframe
              ref={iframeRef}
              src={getVideoUrl(videoPath, isMobile)}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              title="Intro FILM Short"
            ></iframe>
          )}
        </VimeoWrapper>
        <Footer>
          <SkipButton onClick={goToNavigation}>Skip</SkipButton>
        </Footer>
      </Wrapper>
    </Page>
  );
};
