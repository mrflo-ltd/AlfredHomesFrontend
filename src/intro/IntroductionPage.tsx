import React from 'react';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import { REEL_PATH } from '../global/pages';
import { PrimaryButton } from '../components/Button';
import { Logo } from '../components/Logo';
import { Page } from '../components/Page';
import { ThemeType } from '../styles/themes';
import { MainTitle } from '../styles/typography';
import { black } from '../styles/colors';

import imageBackgroundWood from '../assets/background-wood.jpg';
import { sendPageView } from '../utils/analyticsUtils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background-color: ${black};
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
`;

const ContentWrapper = styled.div`
  position: relative;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Title = styled(MainTitle)`
  margin: 120px 0;
  font-size: 52px;
  letter-spacing: 15px;

  @media only screen and (max-width: 1024px) {
    font-size: 42px;
    letter-spacing: 12px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 32px;
    letter-spacing: 10px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 24px;
    line-height: 1.4;
  }
`;

const LogoWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const Footer = styled.footer`
  position: relative;
  margin-bottom: 36px;
`;

export const IntroductionPage = () => {
  sendPageView('/');

  const navigate = useNavigate();

  return (
    <Page>
      <BackgroundImage
        src={imageBackgroundWood}
        alt="Background of Wood floor"
      />
      <Wrapper>
        <ContentWrapper>
          <Title>
            LANGHAM PLACE <br />& GREENWOOD
          </Title>
          <LogoWrapper>
            <Logo themeType={ThemeType.THEME_DARK} width="224px" />
          </LogoWrapper>
        </ContentWrapper>

        <Footer>
          <PrimaryButton onClick={() => navigate(REEL_PATH)}>
            Begin
          </PrimaryButton>
        </Footer>
      </Wrapper>
    </Page>
  );
};
