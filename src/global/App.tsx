import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components/macro';

import { IntroductionPage } from '../intro/IntroductionPage';
import { ReelPresentationPage } from '../intro/ReelPresentationPage';
import { NavigationPage } from '../intro/NavigationPage';
import { LocationPage } from '../location/LocationPage';
import { SitemapPage } from '../location/SitemapPage';
import { WhyWinchesterPage } from '../location/WhyWinchesterPage';
import { DevelopmentPage } from '../development/DevelopmentPage';
import { PreviewPage } from '../preview/PreviewPage';
import { GlobalStyles } from '../styles/globalStyles';
import {
  ABOUT_PATH,
  ALFRED_HOMES_PATH,
  CONTACT_PATH,
  DESIGN_AND_CRAFTSMANSHIP_DETAIL_PATH,
  DESIGN_AND_CRAFTSMANSHIP_PATH,
  DEVELOPMENT_PATH,
  LOCATION_PATH,
  NAVIGATION_PATH,
  REEL_PATH,
  SELECT_YOUR_RESIDENCE_PATH,
  SITEMAP_PATH,
  WHY_WINCHESTER_PATH,
} from './pages';
import { AlfredHomesPage } from '../about/AlfredHomesPage';
import { AboutPage } from '../about/AboutPage';
import { DesignAndCraftsmanShipPage } from '../designCraftsmanship/DesignAndCraftsmanShipPage';
import { DesignAndCraftsmanShipDetailPage } from '../designCraftsmanship/DesignAndCraftsmanShipDetailPage';
import { ContactPage } from '../contact/ContactPage';
import { SelectYourResidencePage } from '../selectResidence/SelectYourResidencePage';
import CookieConsent from 'react-cookie-consent';
import { initializeGoogleAnalytics } from '../utils/analyticsUtils';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
`;

const AppNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<IntroductionPage />} />
      <Route path={REEL_PATH} element={<ReelPresentationPage />} />
      <Route path={NAVIGATION_PATH} element={<NavigationPage />} />
      <Route path={LOCATION_PATH} element={<LocationPage />} />
      <Route path={WHY_WINCHESTER_PATH} element={<WhyWinchesterPage />} />
      <Route path={SITEMAP_PATH} element={<SitemapPage />} />
      <Route path={DEVELOPMENT_PATH} element={<DevelopmentPage />} />
      <Route
        path={`${SELECT_YOUR_RESIDENCE_PATH}/*`}
        element={<SelectYourResidencePage />}
      />

      <Route
        path={DESIGN_AND_CRAFTSMANSHIP_PATH}
        element={<DesignAndCraftsmanShipPage />}
      />
      <Route
        path={DESIGN_AND_CRAFTSMANSHIP_DETAIL_PATH}
        element={<DesignAndCraftsmanShipDetailPage />}
      />
      <Route path={ALFRED_HOMES_PATH} element={<AlfredHomesPage />} />
      <Route path={ABOUT_PATH} element={<AboutPage />} />
      <Route path={CONTACT_PATH} element={<ContactPage />} />

      <Route path="*" element={<PreviewPage />} />
    </Routes>
  );
};

export const App = () => {
  initializeGoogleAnalytics();

  return (
    <React.Fragment>
      <GlobalStyles />

      <Wrapper>
        <AppNavigation />
        <CookieConsent
          location="bottom"
          buttonText="Accept"
          style={{ background: '#EEEEEE', color: '#000000' }}
          contentStyle={{
            fontFamily: 'Gotham',
            marginTop: '25px',
            marginBottom: '25px',
          }}
          buttonStyle={{
            background: '#000000',
            color: '#ffffff',
            fontSize: '13px',
            padding: '10px 15px',
          }}
        >
          By accepting or continuing to browse this site, you are agreeing to
          our use of{' '}
          <a
            href="https://www.alfredhomes.co.uk/cookies.php"
            target={'_blank'}
            rel="noreferrer"
          >
            cookies
          </a>{' '}
          and our{' '}
          <a
            href="https://www.alfredhomes.co.uk/terms-privacy.php"
            target={'_blank'}
            rel="noreferrer"
          >
            terms and privacy policies
          </a>
          .{' '}
        </CookieConsent>
      </Wrapper>
    </React.Fragment>
  );
};
