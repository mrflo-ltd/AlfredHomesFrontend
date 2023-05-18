import { Item } from '../components/Menu.types';

export const WINCHESTER_CENTER_LONGITUDE = -1.3172375;
export const WINCHESTER_CENTER_LATITUDE = 51.0585564;
export const DEFAULT_MAP_ZOOM_LEVEL = 13;

export const getCurrentItem = (items: Item[], selectedItemId?: string) => {
  return selectedItemId !== undefined
    ? items.find((item) => item.id === selectedItemId)
    : undefined;
};

export const getMapCenter = (item?: Item) => {
  return item
    ? {
        lng: item?.location?.longitude || WINCHESTER_CENTER_LONGITUDE,
        lat: item?.location?.latitude || WINCHESTER_CENTER_LATITUDE,
      }
    : {
        lng: WINCHESTER_CENTER_LONGITUDE,
        lat: WINCHESTER_CENTER_LATITUDE,
      };
};
