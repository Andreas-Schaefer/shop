import {DynamicContent} from '../../dynamic-content/dynamic-content';

export interface Categories {
  localeCategories: LocaleCategory[];
}

export interface LocaleCategory {
  locale: string;
  categories: Category[];
}

export interface Category {
  path: string;
  display: string;
}

export interface CategoryContent {
  localeCategoryContents: LocaleCategoryContent[];
}

export interface LocaleCategoryContent {
  locale: string;
  elements: DynamicContent[];
}
