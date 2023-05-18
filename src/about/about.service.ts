import { getPage, PageResponse } from '../global/page.service';

const PAGE_ID_ABOUT = 2067;
const PAGE_ID_ABOUT_DETAIL = 2203;

export type AboutResponse = PageResponse;

export const getAbout = async () => {
  return getPage<AboutResponse>(PAGE_ID_ABOUT);
};

export const getAboutDetail = async () => {
  return getPage<AboutResponse>(PAGE_ID_ABOUT_DETAIL);
};
