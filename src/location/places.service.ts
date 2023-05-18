import { getPage, PageResponse } from '../global/page.service';
import { Category } from '../components/Menu.types';

const PAGE_ID_LOCATION = 2063;

type PlaceResponse = PageResponse & {
  map?: {
    placeCategories: Category[];
  };
};

export const getPlaces = async () => {
  return getPage<PlaceResponse>(PAGE_ID_LOCATION);
};
