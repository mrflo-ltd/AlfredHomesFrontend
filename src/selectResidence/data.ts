import { BedroomCategory, PropertyType, PropertyCategory } from './utils';

export const propertyCategories: PropertyCategory[] = [
  {
    propertyCategoryId: 0,
    propertyType: PropertyType.HOUSE,
    title: 'Houses',
  },
  {
    propertyCategoryId: 1,
    propertyType: PropertyType.APARTMENT,
    title: 'Apartments',
  },
];

export const bedroomsCategories: BedroomCategory[] = [
  {
    bedroomCount: 2,
    title: '2 Bedrooms',
  },
  {
    bedroomCount: 3,
    title: '3 Bedrooms',
  },
  {
    bedroomCount: 4,
    title: '4 Bedrooms',
  },
];
