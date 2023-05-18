import React from 'react';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import {
  SITEMAP_PATH,
  CONTACT_PATH,
  WHY_WINCHESTER_PATH,
} from '../global/pages';
import { BurgerMenu } from '../components/BurgerMenu';
import { ContactButton, FallbackContactButton } from '../components/Button';
import { InternalLink } from '../components/Link';
import { Navigation } from '../components/Navigation';
import { Slider, SlidesFallback } from '../components/Slider';
import {
  Page,
  PageTitle,
  PageContent,
  PageLeftContentWrapper,
} from '../components/Page';
import { stripHTMLTags, getParagraphsFromText } from '../utils/stringUtils';
import {
  WhyWinchesterResponse,
  getWhyWinchester,
} from './whyWinchester.service';
import { black, red } from '../styles/colors';
import { fontFamily, Text, ContentText } from '../styles/typography';
import { sendPageView } from '../utils/analyticsUtils';

const Main = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Subtitle = styled.h2`
  margin-bottom: 24px;
  padding: 0;
  font-family: ${fontFamily.display};
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  color: ${black};
`;

const PhotoWrapper = styled.div`
  position: relative;
  width: 50%;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Photo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Caption = styled(Text)`
  position: absolute;
  bottom: 36px;
  left: 36px;
  padding: 2px 4px;
  z-index: 3;
  background-color: ${black};
`;

const LeftContentWrapper = styled(PageLeftContentWrapper)`
  padding-right: 36px;
`;

const SliderContactButton = styled(ContactButton)`
  z-index: 5;
`;

const LocationLinkWrapper = styled.div`
  margin: 18px 0 0 0;
`;

const LocationLink = styled(InternalLink)`
  font-size: 12px;
  font-family: ${fontFamily.text};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${red};
`;

type WhyWinchesterData = WhyWinchesterResponse;

export const WhyWinchesterPage = () => {
  const [content, setContent] = React.useState<WhyWinchesterData | undefined>(
    undefined
  );
  const [selectedSlideIndex, setSelectedSlideIndex] = React.useState(0);

  sendPageView(WHY_WINCHESTER_PATH);

  const navigate = useNavigate();

  React.useEffect(() => {
    getWhyWinchester()
      .then((whyWinchesterData) => {
        setContent(whyWinchesterData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const whyWinchesterTitle = content?.name || '';
  React.useEffect(() => {
    document.title = whyWinchesterTitle;
  }, [whyWinchesterTitle]);

  const subtitle = content?.textPage?.subTitle || '';
  const whyWinchesterContentParagraphs = getParagraphsFromText(
    content?.textPage?.bodyText || ''
  );

  const slides = (content?.textPage?.pictures || []).map((picture) => ({
    imagePath: picture.url,
    title: picture.name,
    description: stripHTMLTags(picture.description),
    caption: picture.caption,
  }));

  const currentSlide = slides[selectedSlideIndex];

  return (
    <Page>
      <BurgerMenu />

      <Navigation />

      <Main>
        <LeftContentWrapper width="50%">
          <PageContent>
            {whyWinchesterTitle && (
              <PageTitle color={black}>{whyWinchesterTitle}</PageTitle>
            )}

            {subtitle && <Subtitle>{subtitle}</Subtitle>}

            {whyWinchesterContentParagraphs.map((paragraph, index) => {
              return (
                <ContentText
                  key={`why-winchester-${index}`}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              );
            })}

            <Slider
              slides={slides}
              selectedSlideIndex={selectedSlideIndex}
              onSlideClick={(slideIndex) => setSelectedSlideIndex(slideIndex)}
              hasHelperText={false}
            />
            <SlidesFallback
              slides={slides}
              imageWidth="240px"
              imageHeight="240px"
            />

            <LocationLinkWrapper>
              <LocationLink to={SITEMAP_PATH}>View Location map</LocationLink>
            </LocationLinkWrapper>

            <FallbackContactButton onClick={() => navigate(CONTACT_PATH)}>
              Contact
            </FallbackContactButton>
          </PageContent>
        </LeftContentWrapper>

        <PhotoWrapper>
          {currentSlide && (
            <Photo>
              <Image src={currentSlide.imagePath} alt={currentSlide.caption} />
              <Caption>{currentSlide.caption}</Caption>
            </Photo>
          )}
        </PhotoWrapper>
      </Main>

      <SliderContactButton onClick={() => navigate(CONTACT_PATH)}>
        Contact
      </SliderContactButton>
    </Page>
  );
};
