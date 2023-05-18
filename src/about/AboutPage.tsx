import React from 'react';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import { ABOUT_PATH, CONTACT_PATH } from '../global/pages';
import { BurgerMenu } from '../components/BurgerMenu';
import { ContactButton, FallbackContactButton } from '../components/Button';
import { Navigation } from '../components/Navigation';
import {
  Page,
  PageTitle,
  PageLeftContentWrapper,
  PageRightContentWrapper,
  PageContent,
} from '../components/Page';
import { Slider, SlidesFallback } from '../components/Slider';
import { AboutResponse, getAboutDetail } from './about.service';
import { getParagraphsFromText } from '../utils/stringUtils';
import { black } from '../styles/colors';
import { ThemeType } from '../styles/themes';
import { ContentText } from '../styles/typography';
import { sendPageView } from '../utils/analyticsUtils';

const Main = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

type AboutData = AboutResponse;

export const AboutPage = () => {
  const [selectedSlideIndex, setSelectedSlideIndex] = React.useState(0);
  const [content, setContent] = React.useState<AboutData | undefined>(
    undefined
  );

  sendPageView(ABOUT_PATH);

  const navigate = useNavigate();

  React.useEffect(() => {
    getAboutDetail()
      .then((aboutData) => {
        setContent(aboutData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const aboutTitle = content?.name || '';

  React.useEffect(() => {
    if (aboutTitle) {
      document.title = aboutTitle;
    }
  }, [aboutTitle]);

  const aboutContentParagraphs = getParagraphsFromText(
    content?.textPage?.bodyText || ''
  );

  const slides = (content?.textPage?.pictures || []).map((picture) => ({
    imagePath: picture.url,
    title: picture.name,
    description: '',
    caption: '',
  }));

  const currentSlide = slides[selectedSlideIndex];

  return (
    <Page>
      <BurgerMenu themeType={ThemeType.THEME_LIGHT} />

      <Navigation themeType={ThemeType.THEME_LIGHT} />

      <Main>
        <PageLeftContentWrapper>
          <PageContent>
            {aboutTitle && <PageTitle color={black}>{aboutTitle}</PageTitle>}

            {aboutContentParagraphs.map((paragraph, index) => {
              return (
                <ContentText
                  key={`about-${index}`}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              );
            })}

            <Slider
              slides={slides}
              selectedSlideIndex={selectedSlideIndex}
              onSlideClick={(slideIndex) => setSelectedSlideIndex(slideIndex)}
            />
            <SlidesFallback slides={slides} />
            <FallbackContactButton onClick={() => navigate(CONTACT_PATH)}>
              Contact
            </FallbackContactButton>
          </PageContent>
        </PageLeftContentWrapper>

        <PageRightContentWrapper>
          {currentSlide && (
            <Image src={currentSlide.imagePath} alt={currentSlide.caption} />
          )}
        </PageRightContentWrapper>
      </Main>

      <ContactButton onClick={() => navigate(CONTACT_PATH)}>
        Contact
      </ContactButton>
    </Page>
  );
};
