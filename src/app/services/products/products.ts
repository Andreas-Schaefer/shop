import {DynamicContent} from '../../dynamic-content/dynamic-content';

export interface Products {
  localeProducts: LocaleProducts[];
}

export interface LocaleProducts {
  locale: string;
  content: ProductContent;
}

export interface ProductContent {
  elements: DynamicContent[];
  products: Product[];
}

export interface Product {
  title: string;
  imagePath: string;
  imageAlt: string;
  description: string;
}
