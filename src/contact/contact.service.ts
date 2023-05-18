import { getPage, PageResponse } from '../global/page.service';

const PAGE_ID_CONTACT = 2194;

type Logo = {
  name: string;
  thumbnailUrl: string;
  url: string;
  originalUrl: string;
  description?: string | null;
  caption?: string | null;
};

export type Contact = {
  name: string;
  email: string;
  address: string;
  phone: string;
  logo?: Logo | null;
};

export type ContactResponse = PageResponse & {
  contacts: Contact[];
};

export const getContact = async () => {
  return getPage<ContactResponse>(PAGE_ID_CONTACT);
};
