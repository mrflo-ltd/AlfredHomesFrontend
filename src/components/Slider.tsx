import React from 'react';
import styled from 'styled-components/macro';
import { defaultButtonStyles } from './Button';
import { Slide, CategoriesWithSlides } from './Slider.types';
import { red, black } from '../styles/colors';
import { fontFamily, Text } from '../styles/typography';

const Wrapper = styled.div`
  margin-top: 36px;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const CurrentSlide = styled.div``;

const SliderTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-family: ${fontFamily.display};
  font-weight: 600;
  font-size: 24px;
  color: ${black};
  text-transform: uppercase;
  letter-spacing: 5px;

  @media only screen and (max-width: 480px) {
    font-size: 16px;
    line-height: 1.3;
    letter-spacing: 5px;
  }
`;

const SliderDescription = styled(Text)`
  margin: 18px 0;
  padding: 0;
  color: ${black};
`;

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
  margin-top: 18px;
`;

const SlideButton = styled.button<{ $isSelected?: boolean }>`
  ${defaultButtonStyles};

  position: relative;
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.$isSelected ? 1 : 0.4)};

  &:after {
    content: '';
    display: ${(props) => (props.$isSelected ? 'block' : 'none')};
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background-color: ${red};
  }
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
`;

const HelpText = styled(Text)`
  margin-top: 18px;
  color: ${black};
`;

type SliderProps = {
  slides: Slide[];
  selectedSlideIndex: number;
  onSlideClick: (slideIndex: number) => void;
  hasHelperText?: boolean;
};

export const Slider = ({
  slides,
  selectedSlideIndex,
  onSlideClick,
  hasHelperText = true,
}: SliderProps) => {
  const currentSlide = slides[selectedSlideIndex];

  return (
    <Wrapper>
      <CurrentSlide>
        {currentSlide?.title && <SliderTitle>{currentSlide.title}</SliderTitle>}

        {currentSlide?.description && (
          <SliderDescription>{currentSlide.description}</SliderDescription>
        )}
      </CurrentSlide>

      {slides.length > 0 && (
        <React.Fragment>
          <Images>
            {slides.map((slide, index) => (
              <SlideButton
                key={`${slide.imagePath}-${index}`}
                onClick={() => onSlideClick(index)}
                $isSelected={selectedSlideIndex === index}
              >
                <Image src={slide.imagePath} alt={slide?.caption || ''} />
              </SlideButton>
            ))}
          </Images>
          {hasHelperText && <HelpText>Click to enlarge image</HelpText>}
        </React.Fragment>
      )}
    </Wrapper>
  );
};

const FallbackWrapper = styled.div`
  display: none;
  margin-top: 36px;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const Category = styled.div`
  & + & {
    margin-top: 36px;
  }
`;

const SliderCategory = styled.p`
  margin: 0 0 36px 0;
  padding: 0;
  font-family: ${fontFamily.text};
  font-size: 14px;
  font-weight: 300;
  color: ${black};
  text-transform: uppercase;
`;

const FallbackImage = styled(Image)<{ width?: string; height?: string }>`
  width: ${(props) => props?.width || '120px'};
  height: ${(props) => props?.width || '120px'};
  object-fit: cover;
`;

type SliderFallbackProps = {
  categoriesWithSlides: CategoriesWithSlides[];
};

export const SliderFallback = ({
  categoriesWithSlides,
}: SliderFallbackProps) => {
  return (
    <FallbackWrapper>
      {categoriesWithSlides.map((category, index) => (
        <Category key={`${category.category}-${index}`}>
          <SliderCategory>{category.category}</SliderCategory>

          {category?.title && <SliderTitle>{category.title}</SliderTitle>}

          {category?.description && (
            <SliderDescription
              dangerouslySetInnerHTML={{ __html: category.description }}
            />
          )}

          <Images>
            {category.slides.map((slide, slideIndex) => (
              <FallbackImage
                key={`${category.category}-${index}-${slide.imagePath}-${slideIndex}`}
                src={slide.imagePath}
                alt={slide?.caption || ''}
              />
            ))}
          </Images>
        </Category>
      ))}
    </FallbackWrapper>
  );
};

const SlidesFallbackWrapper = styled(FallbackWrapper)`
  margin-top: 36px;
`;

type SlidesFallbackProps = {
  slides: Slide[];
  imageWidth?: string;
  imageHeight?: string;
};

export const SlidesFallback = ({
  slides,
  imageWidth = '120px',
  imageHeight = '120px',
}: SlidesFallbackProps) => {
  return (
    <SlidesFallbackWrapper>
      {slides.map((slide, index) => (
        <Category key={`${slide.title}-${index}`}>
          <SliderTitle>{slide.title}</SliderTitle>
          <SliderDescription>{slide.description}</SliderDescription>
          <FallbackImage
            width={imageWidth}
            height={imageHeight}
            src={slide.imagePath}
            alt={slide?.caption || ''}
          />
        </Category>
      ))}
    </SlidesFallbackWrapper>
  );
};
