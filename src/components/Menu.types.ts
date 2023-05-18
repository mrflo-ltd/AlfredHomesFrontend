export type Coordinates = {
  longitude: number;
  latitude: number;
};

export type Location = Coordinates & {
  fullAddress: string;
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street: string;
  streetNumber: string;
};

export type Item = {
  id: string;
  categoryId: string;
  images: string[];
  name: string;
  details?: Record<string, string>;
  description?: string;
  address?: string;
  location?: Location;
};

export type Category = {
  categoryName: string;
  categoryId: string;
  items: Item[];
};

export type DesignCategory = {
  categoryId: string;
  categoryName: string;
  imagePaths: string[];
  title: string;
  description: string;
};
