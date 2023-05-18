import React from 'react';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import { CONTACT_PATH } from '../global/pages';
import { DesignMenu } from '../components/Menu';
import { BurgerMenu } from '../components/BurgerMenu';
import {
  ContactButton,
  FallbackContactButton,
  WatchVideoButton,
} from '../components/Button';
import { Navigation } from '../components/Navigation';
import {
  Page,
  PageTitle,
  PageContent,
  PageLeftContentWrapper,
  PageRightContentWrapper,
} from '../components/Page';
import { Slider, SliderFallback } from '../components/Slider';
import {
  DesignDetailResponse,
  getDesignAndCraftsmanshipDetail,
} from './designAndCraftsmanship.service';
import { getParagraphsFromText } from '../utils/stringUtils';
import { black } from '../styles/colors';
import { fontFamily, ContentText } from '../styles/typography';
import { VideoModal } from '../components/VideoModal';

const Main = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageVideoButton = styled(WatchVideoButton)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  transform: translate(-50%, -50%);
`;

const Content = styled.div`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const CurrentContent = styled.div`
  margin-top: 36px;
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

const AccordionWrapper = styled.div`
  margin-top: 36px;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

type DesignDetailData = DesignDetailResponse;

export const DesignAndCraftsmanShipDetailPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState('0');
  const [selectedSlideIndex, setSelectedSlideIndex] = React.useState(0);
  const [content, setContent] = React.useState<DesignDetailData | undefined>(
    undefined
  );

  const [isVideoPlaying, setIsVideoPlaying] = React.useState<boolean>(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    getDesignAndCraftsmanshipDetail()
      .then((designData) => {
        setContent(designData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const designTitle = content?.name || '';

  React.useEffect(() => {
    if (designTitle) {
      document.title = designTitle;
    }
  }, [designTitle]);

  const designParagraphs = getParagraphsFromText(
    content?.textPage?.bodyText || ''
  );

  const categories = (content?.textPage?.sections || []).map(
    (section, index) => ({
      categoryId: `${index}`,
      categoryName: section.sectionName,
      title: section.subTitle,
      imagePaths: section.pictures.map((picture) => picture.url),
      pictures: section.pictures,
      description: section.bodyText,
    })
  );

  const categoriesWithSlides = categories.map((category) => ({
    category: category.categoryName,
    description: category.description,
    title: category.title,
    slides: category.pictures.map(({ url, video }) => ({
      imagePath: url,
      videoPath: video,
      caption: '',
    })),
  }));

  const currentCategory = categories.find(
    (category) => category.categoryId === selectedCategoryId
  );

  const slides = (currentCategory?.pictures || []).map(({ url, video }) => ({
    imagePath: url,
    videoPath: video,
    caption: '',
  }));
  const currentSlide = slides[selectedSlideIndex];

  const currentCategoryParagraphs = currentCategory
    ? getParagraphsFromText(currentCategory.description)
    : [];

  return (
    <Page>
      <BurgerMenu />

      <Navigation />

      {isVideoPlaying && currentSlide?.videoPath && (
        <VideoModal
          externalAnimationData={{
            title: '',
            mediaPath: currentSlide?.videoPath,
            name: '',
          }}
          onClose={() => setIsVideoPlaying(false)}
        />
      )}

      <Main>
        <PageLeftContentWrapper width="50%">
          <PageContent>
            {designTitle && <PageTitle color={black}>{designTitle}</PageTitle>}

            {designParagraphs.map((paragraph, index) => {
              return (
                <ContentText
                  key={`design-and-craftsmanship-${index}`}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              );
            })}

            <AccordionWrapper>
              <DesignMenu
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onCategoryClick={(categoryId) => {
                  setSelectedCategoryId(categoryId);
                  setSelectedSlideIndex(0);
                }}
              />
            </AccordionWrapper>

            {currentCategory && (
              <CurrentContent>
                <Content>
                  <Subtitle>{currentCategory.title}</Subtitle>

                  {currentCategoryParagraphs.map((paragraph, index) => {
                    return (
                      <ContentText
                        key={`design-category-${currentCategory.title}-${index}`}
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    );
                  })}
                </Content>

                <Slider
                  slides={slides}
                  selectedSlideIndex={selectedSlideIndex}
                  onSlideClick={(slideIndex) =>
                    setSelectedSlideIndex(slideIndex)
                  }
                />
                <SliderFallback categoriesWithSlides={categoriesWithSlides} />
              </CurrentContent>
            )}

            <FallbackContactButton onClick={() => navigate(CONTACT_PATH)}>
              Contact
            </FallbackContactButton>
          </PageContent>
        </PageLeftContentWrapper>

        <PageRightContentWrapper width="50%">
          {currentSlide && (
            <ImageContainer>
              <Image src={currentSlide.imagePath} alt={currentSlide.caption} />

              {currentSlide?.videoPath && (
                <ImageVideoButton
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsVideoPlaying(true);
                  }}
                >
                  <span />
                </ImageVideoButton>
              )}
            </ImageContainer>
          )}
        </PageRightContentWrapper>
      </Main>

      <ContactButton onClick={() => navigate(CONTACT_PATH)}>
        Contact
      </ContactButton>
    </Page>
  );
};
