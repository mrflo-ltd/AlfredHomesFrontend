import { getPage, PageResponse } from '../global/page.service';

const PAGE_ID_WHY_WINCHESTER = 2208;

export type WhyWinchesterResponse = PageResponse;

export const getWhyWinchester = async () => {
  return getPage<WhyWinchesterResponse>(PAGE_ID_WHY_WINCHESTER);
};
