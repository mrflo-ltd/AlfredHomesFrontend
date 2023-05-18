import React from 'react';
import styled from 'styled-components/macro';
import {
  DESIGN_AND_CRAFTSMANSHIP_DETAIL_PATH,
  DESIGN_AND_CRAFTSMANSHIP_PATH,
} from '../global/pages';
import { BurgerMenu } from '../components/BurgerMenu';
import { Navigation } from '../components/Navigation';
import { FullPageTitle } from '../components/FullPageTitle';
import { Page } from '../components/Page';
import {
  DesignResponse,
  getDesignAndCraftsmanship,
} from './designAndCraftsmanship.service';
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

type DesignData = DesignResponse;

export const DesignAndCraftsmanShipPage = () => {
  const [content, setContent] = React.useState<DesignData | undefined>(
    undefined
  );

  sendPageView(DESIGN_AND_CRAFTSMANSHIP_PATH);

  React.useEffect(() => {
    getDesignAndCraftsmanship()
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

  const picturePath = content?.textPage?.pictures?.[0]?.url || '';
  const videoPath = content?.textPage?.pictures?.[0]?.video;

  return (
    <Page>
      <Wrapper>
        <BurgerMenu themeType={ThemeType.THEME_DARK} />
        <Navigation themeType={ThemeType.THEME_DARK} />

        <FullPageTitle
          title={designTitle}
          backgroundUrl={picturePath}
          videoUrl={videoPath}
          nextPagePath={DESIGN_AND_CRAFTSMANSHIP_DETAIL_PATH}
        />
      </Wrapper>
    </Page>
  );
};
