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
