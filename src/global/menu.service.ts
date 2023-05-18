import { makeApiUrl, getRequest } from '../utils/apiUtils';

const MENU_ENDPOINT = 'Menu';

export type MenuItem = {
  id: number;
  name: string;
  url: string;
  level: number;
  type:
    | 'home'
    | 'map'
    | 'developments'
    | 'development'
    | 'property'
    | 'page'
    | 'contact';
};

export const getMenuData = async () => {
  return getRequest<MenuItem[]>(makeApiUrl(MENU_ENDPOINT));
};
