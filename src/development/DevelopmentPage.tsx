import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { opacify } from 'polished';
import Player from '@vimeo/player';

import {
  CONTACT_PATH,
  DEVELOPMENT_PATH,
  SELECT_YOUR_RESIDENCE_PATH,
} from '../global/pages';
import { BurgerMenu } from '../components/BurgerMenu';
import {
  defaultButtonStyles,
  ContactButton,
  FallbackContactButton,
  CloseButton,
} from '../components/Button';
import { InternalLink } from '../components/Link';
import { Modal } from '../components/Modal';
import { Navigation } from '../components/Navigation';
import { Page } from '../components/Page';
import { stripHTMLTags } from '../utils/stringUtils';
import { getDevelopment, DevelopmentResponse } from './development.service';
import { black, white, greyDarker, red } from '../styles/colors';
import { MainTitle, fontFamily, Text } from '../styles/typography';
import { sendPageView } from '../utils/analyticsUtils';

const Main = styled.main`
  width: 100%;
  height: 100%;

  @media only screen and (max-width: 1024px) {
    padding-top: 100px;
    padding-bottom: 80px;
  }

  @media only screen and (max-width: 480px) {
    padding-top: 72px;
    padding-bottom: 64px;
  }
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  @media only screen and (max-width: 1024px) {
    display: block;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex: 1 1 auto;
  overflow-y: auto;
  height: auto;
  margin: 100px 0 80px;

  @media only screen and (max-width: 1024px) {
    display: block;
    flex: 1 1 auto;
    overflow-y: auto;
    height: 100%;
    margin: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 100px 0 0 0;

  @media only screen and (max-width: 1024px) {
    width: 100%;
    padding-top: 0;
    height: auto;
  }
`;

const LeftContentWrapper = styled(ContentWrapper)`
  padding-top: 0;
`;

const Content = styled.div`
  padding: 20px 72px 36px 72px;

  @media only screen and (max-width: 1024px) {
    overflow-y: unset;
    height: auto;
  }

  @media only screen and (max-width: 480px) {
    padding-left: 18px;
    padding-right: 18px;
  }
`;

const Title = styled(MainTitle)`
  position: relative;
  top: 18px;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.08;
  margin: 0;
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

const Image = styled.img`
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: block;
  max-width: 968px;

  @media only screen and (max-width: 1024px) {
    max-width: 640px;
  }
`;

const Description = styled(Text)`
  margin: 36px auto;
  color: ${black};
  text-align: center;
  max-width: 640px;
`;

const WatchVideoButton = styled.button`
  ${defaultButtonStyles};

  display: flex;
  margin: auto;
  font-family: ${fontFamily.text};
  font-size: 12px;
  font-weight: 400;
  color: ${black};
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-bottom: 4px;
  margin-bottom: 4px;
  border-bottom: 1px solid ${greyDarker};
  z-index: 15;

  @media only screen and (max-width: 768px) {
    margin-bottom: 18px;
  }
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

const VimeoWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const SelectHomeWrapper = styled.div`
  margin: 18px 0 0 0;
  text-align: center;
`;

const SelectHomeLink = styled(InternalLink)`
  font-size: 12px;
  font-family: ${fontFamily.text};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${red};
`;

const Gallery = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 10px auto 0 auto;
  max-width: 968px;

  @media only screen and (max-width: 1024px) {
    max-width: 640px;
  }

  @media only screen and (max-width: 480px) {
    display: block;
    flex-wrap: nowrap;
  }
`;

const GalleryItem = styled.li<{ $isHidden: boolean }>`
  flex-basis: calc(20% - 10px);

  @media only screen and (max-width: 480px) {
    &:first-child {
      display: none;
    }
  }

  ${(props) =>
    props.$isHidden &&
    `
   &:first-child {
      display: none;
    }
  `}
`;

const GalleryItemButton = styled.button<{ $isSelected: boolean }>`
  ${defaultButtonStyles};

  position: relative;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.$isSelected ? 1 : 0.4)};

  @media only screen and (max-width: 480px) {
    pointer-events: none;
    opacity: 1;
  }

  &:after {
    content: '';
    display: ${(props) => (props.$isSelected ? 'block' : 'none')};
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background-color: ${red};

    @media only screen and (max-width: 480px) {
      display: none;
    }
  }
`;

const GalleryImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
`;

type ExternalAnimationData = {
  title: string;
  mediaPath: string;
  name: string;
};

type DevelopmentData = DevelopmentResponse;

type VideoModalProps = {
  externalAnimationData: ExternalAnimationData;
  onClose: () => void;
};

const VideoModal = ({ externalAnimationData, onClose }: VideoModalProps) => {
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

export const DevelopmentPage = () => {
  const [externalAnimationData, setExternalAnimationData] = React.useState<
    ExternalAnimationData | undefined
  >(undefined);
  const [content, setContent] = React.useState<DevelopmentData | undefined>(
    undefined
  );
  const [selectedGalleryItemIndex, setSelectedGalleryItemIndex] =
    React.useState<number | undefined>(undefined);

  sendPageView(DEVELOPMENT_PATH);

  const navigate = useNavigate();

  React.useEffect(() => {
    getDevelopment()
      .then((developmentData) => {
        setContent(developmentData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    if (content?.name) {
      document.title = content.name;
    }
  }, [content?.name]);

  const firstSection = (content?.textPage?.sections || []).find(
    (section) => section.sectionName.toUpperCase() === 'LANGHAM PLACE'
  );
  const pictures = firstSection?.pictures || [];
  const firstPicturePath = pictures?.[0]?.url;
  const picturesPaths = pictures.map((picture) => picture.url);

  React.useEffect(() => {
    if (firstPicturePath) {
      setSelectedGalleryItemIndex(0);
    }
  }, [firstPicturePath]);

  const firstVideoLink = firstSection?.links?.[0]?.url || '';
  const firstVideoName = firstSection?.links?.[0]?.name || '';

  const selectedGalleryItemPath =
    selectedGalleryItemIndex !== undefined
      ? pictures?.[selectedGalleryItemIndex]?.url
      : '';

  return (
    <Page>
      <BurgerMenu />

      <Navigation />

      {externalAnimationData && (
        <VideoModal
          externalAnimationData={externalAnimationData}
          onClose={() => setExternalAnimationData(undefined)}
        />
      )}

      <Main>
        <MainContainer>
          <MainWrapper>
            <LeftContentWrapper>
              {firstSection && (
                <Content>
                  <WatchVideoButton
                    onClick={() =>
                      setExternalAnimationData({
                        title: firstSection.sectionName,
                        mediaPath: firstVideoLink,
                        name: firstVideoName,
                      })
                    }
                  >
                    Click here to watch external animation
                  </WatchVideoButton>

                  {firstSection?.sectionName && (
                    <Title>{firstSection.sectionName}</Title>
                  )}

                  {selectedGalleryItemPath && (
                    <Image
                      src={selectedGalleryItemPath}
                      alt="Langham Place Development"
                    />
                  )}

                  {picturesPaths.length > 0 && (
                    <Gallery>
                      {picturesPaths.map((picturePath, index) => (
                        <GalleryItem
                          key={`${picturePath}-${index}`}
                          $isHidden={picturesPaths.length === 1 && index === 0}
                        >
                          <GalleryItemButton
                            $isSelected={selectedGalleryItemIndex === index}
                            onClick={() => setSelectedGalleryItemIndex(index)}
                          >
                            <GalleryImage src={picturePath} alt="" />
                          </GalleryItemButton>
                        </GalleryItem>
                      ))}
                    </Gallery>
                  )}

                  {firstSection?.bodyText && (
                    <Description>
                      {stripHTMLTags(firstSection.bodyText)}
                    </Description>
                  )}

                  {content?.textPage?.bodyText && (
                    <Description>
                      {stripHTMLTags(content.textPage.bodyText)}
                    </Description>
                  )}

                  <SelectHomeWrapper>
                    <SelectHomeLink to={SELECT_YOUR_RESIDENCE_PATH}>
                      Select your home
                    </SelectHomeLink>
                  </SelectHomeWrapper>

                  <FallbackContactButton onClick={() => navigate(CONTACT_PATH)}>
                    Contact
                  </FallbackContactButton>
                </Content>
              )}
            </LeftContentWrapper>
          </MainWrapper>
        </MainContainer>
      </Main>

      <ContactButton onClick={() => navigate(CONTACT_PATH)}>
        Contact
      </ContactButton>
    </Page>
  );
};
