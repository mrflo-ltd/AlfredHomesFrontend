import React from 'react';
import styled from 'styled-components/macro';
import { LOCATION_PATH, WHY_WINCHESTER_PATH } from '../global/pages';
import { BurgerMenu } from '../components/BurgerMenu';
import { FullPageTitle } from '../components/FullPageTitle';
import { Navigation } from '../components/Navigation';
import { Page } from '../components/Page';
import { LocationResponse, getLocation } from './location.service';
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

type LocationData = LocationResponse;

export const LocationPage = () => {
  const [content, setContent] = React.useState<LocationData | undefined>(
    undefined
  );

  sendPageView(LOCATION_PATH);

  React.useEffect(() => {
    getLocation()
      .then((locationData) => {
        setContent(locationData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const locationTitle = content?.name || '';

  React.useEffect(() => {
    document.title = locationTitle;
  }, [locationTitle]);

  const picturePath = content?.textPage?.pictures?.[0]?.url || '';
  const videoPath = content?.textPage?.pictures?.[0]?.video;

  return (
    <Page>
      <Wrapper>
        <BurgerMenu themeType={ThemeType.THEME_DARK} />
        <Navigation themeType={ThemeType.THEME_DARK} />

        <FullPageTitle
          title={locationTitle}
          backgroundUrl={picturePath}
          videoUrl={videoPath}
          nextPagePath={WHY_WINCHESTER_PATH}
        />
      </Wrapper>
    </Page>
  );
};
