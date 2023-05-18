export type Slide = {
  imagePath: string;
  title?: string;
  description?: string;
  caption?: string;
};

export type CategoriesWithSlides = {
  category: string;
  title?: string;
  description?: string;
  slides: Slide[];
};
