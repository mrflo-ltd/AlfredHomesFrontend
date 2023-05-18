import { getPage, PageResponse } from '../global/page.service';

const PAGE_ID_REEL = 2074;

export type ReelResponse = PageResponse;

export const getReel = async () => {
  return getPage<ReelResponse>(PAGE_ID_REEL);
};
