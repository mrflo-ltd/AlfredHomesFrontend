export const HOMEPAGE_PATH = '*';
export const INTRO_PATH = '/intro';
export const REEL_PATH = '/reel';
export const NAVIGATION_PATH = '/home';
export const LOCATION_PATH = '/location';
export const WHY_WINCHESTER_PATH = '/why-winchester';
export const SITEMAP_PATH = '/sitemap';
export const ALFRED_HOMES_PATH = '/alfred-homes';
export const ABOUT_PATH = '/alfred-homes/about';
export const DEVELOPMENT_PATH = '/development';
export const SELECT_YOUR_RESIDENCE_PATH = '/select-your-home';
export const DESIGN_AND_CRAFTSMANSHIP_PATH = '/design-and-craftsmanship';
export const DESIGN_AND_CRAFTSMANSHIP_DETAIL_PATH =
  '/design-and-craftsmanship/detail';
export const CONTACT_PATH = '/contact';

export const BURGER_MENU_PAGES_PATH = [
  LOCATION_PATH,
  DEVELOPMENT_PATH,
  SELECT_YOUR_RESIDENCE_PATH,
  DESIGN_AND_CRAFTSMANSHIP_PATH,
  ALFRED_HOMES_PATH,
  CONTACT_PATH,
];

export const PAGES_TITLES_MAP: Record<string, string> = {
  [NAVIGATION_PATH]: 'Langham Place & Greenwood',
  [LOCATION_PATH]: 'Location',
  [WHY_WINCHESTER_PATH]: 'Location',
  [SITEMAP_PATH]: 'Location',
  [DEVELOPMENT_PATH]: 'An introduction to the development',
  [SELECT_YOUR_RESIDENCE_PATH]: 'Select your home',
  [DESIGN_AND_CRAFTSMANSHIP_PATH]: 'Design & Craftsmanship',
  [DESIGN_AND_CRAFTSMANSHIP_DETAIL_PATH]: 'Design & Craftsmanship',
  [ALFRED_HOMES_PATH]: 'Alfred Homes',
  [ABOUT_PATH]: 'About Alfred Homes',
  [CONTACT_PATH]: 'Contact',
};

type PageNeighbors = {
  previousPath: string;
  nextPath: string;
};

export const NAVIGATION_PAGES_TREE_MAP: Record<string, PageNeighbors> = {
  [NAVIGATION_PATH]: { previousPath: '', nextPath: LOCATION_PATH },
  [LOCATION_PATH]: {
    previousPath: NAVIGATION_PATH,
    nextPath: WHY_WINCHESTER_PATH,
  },
  [WHY_WINCHESTER_PATH]: {
    previousPath: LOCATION_PATH,
    nextPath: SITEMAP_PATH,
  },
  [SITEMAP_PATH]: {
    previousPath: WHY_WINCHESTER_PATH,
    nextPath: DEVELOPMENT_PATH,
  },
  [DEVELOPMENT_PATH]: {
    previousPath: SITEMAP_PATH,
    nextPath: SELECT_YOUR_RESIDENCE_PATH,
  },
  [SELECT_YOUR_RESIDENCE_PATH]: {
    previousPath: DEVELOPMENT_PATH,
    nextPath: DESIGN_AND_CRAFTSMANSHIP_PATH,
  },
  [DESIGN_AND_CRAFTSMANSHIP_PATH]: {
    previousPath: SELECT_YOUR_RESIDENCE_PATH,
    nextPath: DESIGN_AND_CRAFTSMANSHIP_DETAIL_PATH,
  },
  [DESIGN_AND_CRAFTSMANSHIP_DETAIL_PATH]: {
    previousPath: DESIGN_AND_CRAFTSMANSHIP_PATH,
    nextPath: ALFRED_HOMES_PATH,
  },
  [ALFRED_HOMES_PATH]: {
    previousPath: DESIGN_AND_CRAFTSMANSHIP_DETAIL_PATH,
    nextPath: ABOUT_PATH,
  },
  [ABOUT_PATH]: {
    previousPath: ALFRED_HOMES_PATH,
    nextPath: CONTACT_PATH,
  },
  [CONTACT_PATH]: {
    previousPath: ABOUT_PATH,
    nextPath: '',
  },
};
