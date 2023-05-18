import React from 'react';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import {
  REEL_PATH,
  LOCATION_PATH,
  ALFRED_HOMES_PATH,
  DEVELOPMENT_PATH,
  SELECT_YOUR_RESIDENCE_PATH,
  DESIGN_AND_CRAFTSMANSHIP_PATH,
  CONTACT_PATH,
  NAVIGATION_PATH,
} from '../global/pages';
import { defaultButtonStyles } from '../components/Button';
import { Page } from '../components/Page';
import { InternalLink } from '../components/Link';
import { Logo } from '../components/Logo';
import { getNavigation, NavigationResponse } from './navigation.service';
import { black, white, red } from '../styles/colors';
import { MainTitle, fontFamily } from '../styles/typography';
import { sendPageView } from '../utils/analyticsUtils';

const Wrapper = styled.div`
  @media only screen and (min-width: 1024px) {
    max-width: 1640px;
  }

  width: 100%;
  margin: 0 auto;
  padding: 0 36px;

  @media only screen and (max-width: 1024px) {
    padding: 0 24px;
  }

  @media only screen and (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Title = styled(MainTitle)`
  position: relative;
  top: 24px;
  font-size: 48px;
  font-weight: 400;
  line-height: 1.08;
  margin: 0;
  color: ${black};
  letter-spacing: 12px;
  z-index: 2;

  @media only screen and (max-width: 1024px) {
    font-size: 42px;
    letter-spacing: 12px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 32px;
    letter-spacing: 10px;
  }

  @media only screen and (max-width: 480px) {
    position: static;
    margin: 16px 0;
    font-size: 24px;
    letter-spacing: 10px;
  }
`;

const GridWrapper = styled.div``;

const Grid = styled.div`
  @media only screen and (min-width: 1024px) {
    max-height: 720px;
  }

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 8px;
  row-gap: 8px;

  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 240px 240px 240px;
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 240px 240px 240px;
  }

  @media only screen and (max-width: 480px) {
    display: block;
    grid-template-columns: none;
    grid-template-rows: none;
  }
`;

const GridItem = styled.div`
  position: relative;
  width: 100%;

  @media only screen and (max-width: 480px) {
    & + & {
      margin-top: 16px;
    }
  }
`;

const FirstGridItem = styled(GridItem)`
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 2;
`;

const SecondGridItem = styled(GridItem)`
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 2;
`;

const ThirdGridItem = styled(GridItem)`
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 4;

  @media only screen and (max-width: 1024px) {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 2;
    grid-column-end: 4;
  }

  @media only screen and (max-width: 768px) {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 2;
    grid-column-end: 3;
  }
`;

const FourthGridItem = styled(GridItem)`
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 4;
  grid-column-end: 6;

  @media only screen and (max-width: 1024px) {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 4;
  }

  @media only screen and (max-width: 768px) {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 3;
  }
`;

const FifthGridItem = styled(GridItem)`
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 4;
  grid-column-end: 5;

  @media only screen and (max-width: 1024px) {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 3;
  }

  @media only screen and (max-width: 768px) {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 2;
  }
`;

const SixthGridItem = styled(GridItem)`
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 5;
  grid-column-end: 6;

  @media only screen and (max-width: 1024px) {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 3;
    grid-column-end: 4;
  }

  @media only screen and (max-width: 768px) {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 3;
  }
`;

const GridItemLink = styled(InternalLink)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 50%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }
`;

const LogoWrapper = styled.div`
  margin: 36px auto;
  text-align: center;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media only screen and (max-width: 480px) {
    height: 300px;
  }

  @media only screen and (max-width: 360px) {
    height: 240px;
  }
`;

const Caption = styled.h3`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  font-family: ${fontFamily.display};
  font-size: 28px;
  font-weight: 600;
  line-height: 1.2;
  color: ${white};
  text-align: center;
  z-index: 2;

  @media only screen and (max-width: 1024px) {
    font-size: 22px;
  }
`;

const LocationLinkWrapper = styled.div`
  margin-top: 36px;
  margin-right: auto;

  @media only screen and (max-width: 1024px) {
    margin-top: 24px;
  }

  @media only screen and (max-width: 768px) {
    margin-top: 18px;
  }
`;

const ViewButton = styled.button`
  ${defaultButtonStyles};

  padding: 4px;
  margin-left: -4px;
  font-size: 12px;
  font-family: ${fontFamily.text};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${red};

  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export type NavigationData = NavigationResponse;

export const NavigationPage = () => {
  const [content, setContent] = React.useState<NavigationData | undefined>(
    undefined
  );

  sendPageView(NAVIGATION_PATH);

  const navigate = useNavigate();
  const gridRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    document.title = 'Navigation';

    getNavigation()
      .then((whyWinchesterData) => {
        setContent(whyWinchesterData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const images = (content?.textPage?.pictures || []).map((picture) => ({
    imagePath: picture.originalUrl,
    name: picture.name,
    caption: picture.caption,
  }));

  return (
    <Page>
      <Wrapper>
        <LocationLinkWrapper>
          <ViewButton onClick={() => navigate(REEL_PATH)}>
            View Intro Film
          </ViewButton>
        </LocationLinkWrapper>

        <Title>
          LANGHAM PLACE <br />
          <span>& GREENWOOD</span>
        </Title>
        <GridWrapper>
          <Grid ref={gridRef}>
            <FirstGridItem>
              {images[0] && (
                <GridItemLink to={LOCATION_PATH}>
                  <Image src={images[0].imagePath} alt={images[0].caption} />
                  <Caption>{images[0].name}</Caption>
                </GridItemLink>
              )}
            </FirstGridItem>

            <SecondGridItem>
              {images[1] && (
                <GridItemLink to={ALFRED_HOMES_PATH}>
                  <Image src={images[1].imagePath} alt={images[1].caption} />
                  <Caption>{images[1].name}</Caption>
                </GridItemLink>
              )}
            </SecondGridItem>

            <ThirdGridItem>
              {images[2] && (
                <GridItemLink to={DEVELOPMENT_PATH}>
                  <Image src={images[2].imagePath} alt={images[2].caption} />
                  <Caption>{images[2].name}</Caption>
                </GridItemLink>
              )}
            </ThirdGridItem>

            <FourthGridItem>
              {images[3] && (
                <GridItemLink to={SELECT_YOUR_RESIDENCE_PATH}>
                  <Image src={images[3].imagePath} alt={images[3].caption} />
                  <Caption>{images[3].name}</Caption>
                </GridItemLink>
              )}
            </FourthGridItem>

            <FifthGridItem>
              {images[4] && (
                <GridItemLink to={DESIGN_AND_CRAFTSMANSHIP_PATH}>
                  <Image src={images[4].imagePath} alt={images[4].caption} />
                  <Caption>{images[4].name}</Caption>
                </GridItemLink>
              )}
            </FifthGridItem>

            <SixthGridItem>
              {images[5] && (
                <GridItemLink to={CONTACT_PATH}>
                  <Image src={images[5].imagePath} alt={images[5].caption} />
                  <Caption>{images[5].name}</Caption>
                </GridItemLink>
              )}
            </SixthGridItem>
          </Grid>
        </GridWrapper>

        <LogoWrapper>
          <Logo hasSlogan={false} width="64px" />
        </LogoWrapper>
      </Wrapper>
    </Page>
  );
};
