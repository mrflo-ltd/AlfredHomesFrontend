import { getPage, PageResponse } from '../global/page.service';

const PAGE_ID_NAVIGATION = 1063;

export type NavigationResponse = PageResponse;

export const getNavigation = async () => {
  return getPage<NavigationResponse>(PAGE_ID_NAVIGATION);
};
