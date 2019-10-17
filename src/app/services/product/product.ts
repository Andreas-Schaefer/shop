export interface Product {
  localeProducts: LocaleProduct[];
}

export interface LocaleProduct {
  locale: string;
  productDetail: ProductDetail;
}

export interface ProductDetail {
  title: string;
  link: string;
  description: string;
  images: ImageData[];
  options: Option[];
}

export interface ImageData {
  imagePath: string;
  imageAlt: string;
}

export interface Option {
  display: string;
  price: number;
}
