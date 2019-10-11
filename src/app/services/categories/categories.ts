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
  path: string;
  elements: CategoryElement[];
}

export interface CategoryElement {
  type: string;
  content: any;
}
