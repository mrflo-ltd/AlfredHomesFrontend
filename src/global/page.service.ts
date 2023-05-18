import { makeApiUrl, getRequest } from '../utils/apiUtils';

const PAGE_ENDPOINT = 'Pages';

type PagePicture = {
  name: string;
  thumbnailUrl: string;
  url: string;
  video?: string;
  originalUrl: string;
  description: string;
  caption: string;
};

type PageLink = {
  url: string;
  name: string;
  target: string;
};

type PageSection = {
  sectionName: string;
  subTitle: string;
  bodyText: string;
  pictures: PagePicture[];
  links: PageLink[];
};

type PageContent = {
  subTitle: string;
  bodyText: string;
  pictures: PagePicture[];
  sections: PageSection[];
  video?: string;
};

export type PageResponse = {
  name: string;
  textPage: PageContent;
};

export type MenuItem = {
  id: number;
  name: string;
  url: string;
};

export const getPage = async <T>(pageId: number) => {
  return getRequest<T>(`${makeApiUrl(PAGE_ENDPOINT)}/${pageId}`);
};
