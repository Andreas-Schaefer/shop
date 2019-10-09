export interface Menus {
  localeMenus: LocaleMenu[];
}

export interface LocaleMenu {
  locale: string;
  menus: Menu[];
}

export interface Menu {
  path: string;
  display: string;
  children: Menu[];
}
