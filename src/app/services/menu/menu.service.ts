import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MenuEntry, Menus} from './menus';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuProductsCache: MenuEntry[];
  menuOtherCache: MenuEntry[];

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private localeId: string) {
  }

  public getProducts() {
    return this.http.get<Menus>('/assets/menu.json')
      .pipe(map(data => {
        for (const localeMenu of data.localeMenus) {
          if (localeMenu.locale === this.localeId) {
            this.menuProductsCache = this.flatEntries(localeMenu.products);
            return localeMenu.products;
          }
        }
        return [];
      }));
  }

  public getOther() {
    return this.http.get<Menus>('/assets/menu.json')
      .pipe(map(data => {
        for (const localeMenu of data.localeMenus) {
          if (localeMenu.locale === this.localeId) {
            this.menuOtherCache = this.flatEntries(localeMenu.other);
            return localeMenu.other;
          }
        }
        return [];
      }));
  }

  public getDisplayForPath(path: string) {
    if (typeof this.menuProductsCache !== 'undefined') {
      for (const entry of this.menuProductsCache) {
        if (entry.path === path) {
          return entry.display;
        }
      }
    }
    if (typeof this.menuOtherCache !== 'undefined') {
      for (const entry of this.menuOtherCache) {
        if (entry.path === path) {
          return entry.display;
        }
      }
    }
    return '';
  }

  private flatEntries(entries: MenuEntry[]) {
    const flattedEntries: MenuEntry[] = [];
    entries.forEach(entry => flattedEntries.push(entry));
    entries.forEach(entry => this.readChildEntriesRecursive(entry, flattedEntries));
    return flattedEntries;
  }

  private readChildEntriesRecursive(menuEntry: MenuEntry, flattedEntries: MenuEntry[]) {
    menuEntry.children.forEach(entry => flattedEntries.push(entry));
    menuEntry.children.forEach(entry => this.readChildEntriesRecursive(entry, flattedEntries));
  }
}
