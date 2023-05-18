import ReactGA from 'react-ga4';

export const initializeGoogleAnalytics = () => {
  return ReactGA.initialize('G-VRH3YNPJDF');
};

export const sendPageView = (pagePath: string) => {
  return ReactGA.send({ hitType: 'pageview', page: pagePath });
};
