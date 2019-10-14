export interface Menus {
  localeMenus: LocaleMenu[];
}

export interface LocaleMenu {
  locale: string;
  products: MenuEntry[];
  other: MenuEntry[];
}

export interface MenuEntry {
  path: string;
  display: string;
  children: MenuEntry[];
}
