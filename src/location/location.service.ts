import { getPage, PageResponse } from '../global/page.service';

const PAGE_ID_LOCATION = 2217;

export type LocationResponse = PageResponse;

export const getLocation = async () => {
  return getPage<LocationResponse>(PAGE_ID_LOCATION);
};
