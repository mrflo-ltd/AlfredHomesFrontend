import { getPage, PageResponse } from '../global/page.service';

const PAGE_ID_DEVELOPMENT = 2075;

export type DevelopmentResponse = PageResponse;

export const getDevelopment = async () => {
  return getPage<DevelopmentResponse>(PAGE_ID_DEVELOPMENT);
};
