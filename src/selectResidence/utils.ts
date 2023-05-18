export enum PropertyAvailabilityStatus {
  AVAILABLE = 'Available',
  RESERVED = 'Reserved',
  SOLD = 'Sold',
}

export enum DevelopmentType {
  GREENWOOD = 'GREENWOOD',
  LANGHAM_PLACE = 'LANGHAM_PLACE',
}

export const DEVELOPMENT_TYPE_TO_URL_MAP: Record<DevelopmentType, string> = {
  [DevelopmentType.GREENWOOD]: 'greenwood',
  [DevelopmentType.LANGHAM_PLACE]: 'langham-place',
};
export const DEVELOPMENT_URL_TO_TYPE_MAP: Record<string, DevelopmentType> = {
  greenwood: DevelopmentType.GREENWOOD,
  'langham-place': DevelopmentType.LANGHAM_PLACE,
};

export enum PropertyType {
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
}

export enum ResidenceType {
  RESIDENCE_BROADLEAF = 'RESIDENCE_BROADLEAF',
  RESIDENCE_WESTWOOD = 'RESIDENCE_WESTWOOD',
  RESIDENCE_AMPFIELD_HOUSE = 'RESIDENCE_AMPFIELD_HOUSE',
  RESIDENCE_CHAWTON = 'RESIDENCE_CHAWTON',
  RESIDENCE_1_2 = 'RESIDENCE_1_2',
  RESIDENCE_3_7 = 'RESIDENCE_3_7',
  RESIDENCE_8_12 = 'RESIDENCE_8_12',
  RESIDENCE_13 = 'RESIDENCE_13',
  RESIDENCE_14 = 'RESIDENCE_14',
  RESIDENCE_15 = 'RESIDENCE_15',
  RESIDENCE_16 = 'RESIDENCE_16',
  RESIDENCE_17 = 'RESIDENCE_17',
  RESIDENCE_18 = 'RESIDENCE_18',
  RESIDENCE_19 = 'RESIDENCE_19',
}

export const RESIDENCE_TO_SVG_PATH_MAP: Record<ResidenceType, string> = {
  [ResidenceType.RESIDENCE_BROADLEAF]:
    'm261.21 411.09 16.43 9.06-2.79 5.05 15.11 8.33 2.79-5.05 16.43 9.06 20.9-37.92 32.86 18.12 20.88-37.86-20.8-11.47-2.44 4.42-60.03-33.09-39.34 71.35z',
  [ResidenceType.RESIDENCE_WESTWOOD]:
    'm381.19 439.4-19.48 35.34 18.96 10.45-1.04 1.89 5.05 2.79-2.78 5.06 21.42 11.81 2.79-5.06 5.06 2.79 19.85-36.02 39.82 21.95 11.15-20.22 5.05 2.78 11.82-21.43-5.21-2.52 3.63-6.58-71.35-39.34-25.78 46.77-18.96-10.46z',
  [ResidenceType.RESIDENCE_AMPFIELD_HOUSE]:
    'm223.29 560.77 38.52 22.63 38.7-65.9-4.97-2.92 2.92-4.98-14.88-8.74-2.92 4.98-22.52-13.23 2.99-4.94-14.88-8.74-3.18 4.83-4.72-2.77-1.1 1.86-34.84-20.47-21.9 37.28 34.85 20.47-6.95 11.82 23.65 13.89-8.77 14.93z',
  [ResidenceType.RESIDENCE_CHAWTON]:
    'm308.05 534.55 18.67 10.96 13.52-23.02 24.83 14.59-5.11 8.71 16.23 9.53 5.12-8.71 24.83 14.59-32.49 55.32-24.27-14.26-22.29 37.96-41.64-24.46 19.37-32.97-18.66-10.97 21.89-37.27z',
  [ResidenceType.RESIDENCE_1_2]:
    'm862.95 314.69 9.84 12.46-19.27 15.2 32.62 41.36 65.68-51.8-32.63-41.36-19.26 15.19-9.83-12.46-27.15 21.41z',
  [ResidenceType.RESIDENCE_3_7]:
    'm997.63 383-10.2 8.05 13.45 17.04 10.2-8.04 42.41 53.77-72.47 57.17-98.27-124.6 72.47-57.16L997.63 383z',
  [ResidenceType.RESIDENCE_8_12]:
    'm1077.32 484.04 42.37 53.81-10.2 8.04 13.49 17.02 10.2-8.05 42.42 53.78-72.49 57.15-98.3-124.55 72.51-57.2z',
  [ResidenceType.RESIDENCE_13]:
    'm1008.09 621.82-1.78 1.4 2.78 3.53-6.12 4.82-.57-.73-9.19 7.25.57.73-5.44 4.29-.59-.72-9.17 7.24.57.73-6.12 4.83 64.07 81.22 38.08-30.04-67.09-84.55z',
  [ResidenceType.RESIDENCE_14]:
    'm966.23 646.56-1.9 1.5 2.78 3.53-6.12 4.82-.57-.73-9.19 7.25.57.73-5.44 4.29-.58-.73-9.19 7.25.58.73-6.12 4.83-2.78-3.53-1.77 1.4 66.59 84.95 37.88-30.29 4.22 5.35 1.91-1.5-70.87-89.85z',
  [ResidenceType.RESIDENCE_15]:
    'm916.06 686.13-1.77 1.4 2.78 3.53-6.12 4.82-.58-.73-9.19 7.25.58.73-5.44 4.29-.6-.71-9.17 7.23.58.73-6.12 4.83 64.19 81.12 37.96-29.94-67.1-84.55z',
  [ResidenceType.RESIDENCE_16]:
    'm878.23 715.98-1.9 1.49 6.8 8.63-6.12 4.82-.58-.72-9.19 7.24.58.73-5.44 4.3-.58-.74-9.19 7.25.58.73-6.12 4.83-2.78-3.53-1.78 1.4 66.6 84.95 40.11-31.64-70.99-89.74z',
  [ResidenceType.RESIDENCE_17]:
    'm737.03 802.41 95.34 42.95 14.79-32.84-27.63-12.45 17.49-38.82-48.63-21.9-14.52 32.24-17.83-8.03-15.97 35.46-1.26-.56-1.78 3.95z',
  [ResidenceType.RESIDENCE_18]:
    'm708.54 784.83 31.53 14.19 38.8-86.12-48.63-21.91-5.34 11.84-17.82-8.03-17.76 39.42 17.83 8.03-9.19 20.39 17.1 7.71-6.52 14.48z',
  [ResidenceType.RESIDENCE_19]:
    'm647.22 697.84 17.1 7.71-6.52 14.47 31.52 14.2 38.8-86.13-48.62-21.91-7.12 15.8-19.79-8.92-17.76 39.41 19.8 8.92-7.41 16.45z',
};

export enum LayoutType {
  LAYOUT_CGI = 'LAYOUT_CGI',
  LAYOUT_FLOORPLAN = 'LAYOUT_FLOORPLAN',
  LAYOUT_SPEC = 'LAYOUT_SPEC',
}

export type PropertyCategory = {
  propertyCategoryId: number;
  propertyType: PropertyType;
  title: string;
};

export type BedroomCategory = {
  bedroomCount: number;
  title: string;
};

export type PropertySummarySpecification = {
  title: string;
  summary: string;
  summaryItems: {
    title: string;
    items: string[];
  }[];
  imagePaths: string[];
};

type PropertyRoom = {
  id: string;
  title: string;
  dimensionsMeters: string;
  dimensionsFeet: string;
};

export type PropertyDetailsCategory = {
  id: string;
  title: string;
  layoutType: LayoutType;
  floorplan?: PropertyFloorplan;
  rooms: PropertyRoom[];
};

type PropertyFloorplan = {
  imagePath: string;
};

export type FloorplanLayout = {
  floorPlans: string[];
  id: string;
  rooms: PropertyRoom[];
  title: string;
  initialZoomLevel: number;
};

type PropertyContent = {
  description: string;
  id: string;
  images: string[];
  listOfItems: {
    title: string;
    items: string[];
  }[];
  title: string;
};

export type Property = {
  availabilityStatus: PropertyAvailabilityStatus;
  bedroomsCount: number;
  cgi: string[];
  description: string;
  developmentId: string;
  disclaimer: string;
  layouts: FloorplanLayout[];
  minimapImagePath: string;
  pdfPath: string[];
  propertyContents: PropertyContent[];
  price: number;
  propertyId: number;
  propertyType: PropertyType;
  residenceType: ResidenceType;
  title: string;
};

export type Development = {
  description: string;
  developmentId: string;
  developmentType: DevelopmentType;
  properties: Property[];
  title: string;
};

export const convertToMillionUnits = (price: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    notation: 'compact',
    compactDisplay: 'short',
    currency: 'GBP',
    useGrouping: true,
    maximumSignificantDigits: 2,
  }).format(price);
};

export const isIncludedInProperties = (
  properties: Property[],
  residenceType: ResidenceType
) => {
  return properties.some(
    (property) => property.residenceType === residenceType
  );
};

export const getPropertiesByResidenceType = (
  properties: Property[],
  residenceType: ResidenceType
) => {
  return properties.filter(
    (property) => property.residenceType === residenceType
  );
};

export const getDevelopmentIdByResidenceType = (
  properties: Property[],
  residenceType: ResidenceType
) => {
  const property = properties.find(
    (property) => property.residenceType === residenceType
  );
  return property?.developmentId;
};

export const getBedroomCategoriesByPropertyType = (
  developments: Development[],
  bedroomsCategories: BedroomCategory[],
  selectedPropertyType?: PropertyType
) => {
  if (selectedPropertyType === undefined) {
    return [];
  }

  const propertiesByPropertyType = developments
    .flatMap((development) => development.properties)
    .filter((property) => property.propertyType === selectedPropertyType);

  return bedroomsCategories.filter((bedroomCategory) =>
    propertiesByPropertyType.some(
      (property) => property.bedroomsCount === bedroomCategory.bedroomCount
    )
  );
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    useGrouping: true,
    maximumSignificantDigits: 5,
  }).format(price);
};

export const shouldShowPropertyPrice = (property: Property) => {
  return (
    property?.availabilityStatus === PropertyAvailabilityStatus.AVAILABLE &&
    property?.price &&
    property.price > 0
  );
};
