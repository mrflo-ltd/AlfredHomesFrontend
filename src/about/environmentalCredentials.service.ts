import { getPage, PageResponse } from '../global/page.service';

const PAGE_ID_ENVIRONMENTAL_CREDENTIALS = 2202;

export type CredentialsResponse = PageResponse;

export const getEnvironmentalCredentials = async () => {
  return getPage<CredentialsResponse>(PAGE_ID_ENVIRONMENTAL_CREDENTIALS);
};
