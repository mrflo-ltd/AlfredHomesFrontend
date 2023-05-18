import { getPage, PageResponse } from '../global/page.service';

const PAGE_ID_DESIGN_AND_CRAFTSMANSHIP = 2165;
const PAGE_ID_DESIGN_AND_CRAFTSMANSHIP_DETAIL = 2166;

export type DesignResponse = PageResponse;

export const getDesignAndCraftsmanship = async () => {
  return getPage<DesignResponse>(PAGE_ID_DESIGN_AND_CRAFTSMANSHIP);
};

export type DesignDetailResponse = PageResponse;

export const getDesignAndCraftsmanshipDetail = async () => {
  return getPage<DesignDetailResponse>(PAGE_ID_DESIGN_AND_CRAFTSMANSHIP_DETAIL);
};
