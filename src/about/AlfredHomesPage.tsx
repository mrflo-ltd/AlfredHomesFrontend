import React from 'react';
import styled from 'styled-components/macro';
import { ABOUT_PATH, ALFRED_HOMES_PATH } from '../global/pages';
import { BurgerMenu } from '../components/BurgerMenu';
import { Navigation } from '../components/Navigation';
import { Page } from '../components/Page';
import { FullPageTitle } from '../components/FullPageTitle';
import { getAbout, AboutResponse } from './about.service';
import { black } from '../styles/colors';
import { ThemeType } from '../styles/themes';
import { sendPageView } from '../utils/analyticsUtils';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background-color: ${black};
`;

type AboutData = AboutResponse;

export const AlfredHomesPage = () => {
  const [content, setContent] = React.useState<AboutData | undefined>(
    undefined
  );

  sendPageView(ALFRED_HOMES_PATH);

  React.useEffect(() => {
    getAbout()
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

  const picturePath = content?.textPage?.pictures?.[0]?.url || '';
  const videoPath = content?.textPage?.pictures?.[0]?.video;

  return (
    <Page>
      <Wrapper>
        <BurgerMenu themeType={ThemeType.THEME_DARK} />
        <Navigation themeType={ThemeType.THEME_DARK} />

        <FullPageTitle
          title={aboutTitle}
          backgroundUrl={picturePath}
          videoUrl={videoPath}
          nextPagePath={ABOUT_PATH}
          style={{ fontFamily: 'Times New Roman', fontWeight: 100 }}
        />
      </Wrapper>
    </Page>
  );
};
