import { getPage, PageResponse } from '../global/page.service';
import { Development } from './utils';

const PAGE_ID_SELECT_YOUR_HOME = 2112;

export type ResidencesResponse = PageResponse & {
  developments: (Omit<Development, 'developmentId'> & { id: number })[];
};

export const getResidences = async () => {
  return getPage<ResidencesResponse>(PAGE_ID_SELECT_YOUR_HOME);
};
