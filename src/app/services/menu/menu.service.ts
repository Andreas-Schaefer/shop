import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Menus} from './menus';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private localeId: string) {
  }

  public getProducts() {
    return this.http.get<Menus>('/assets/menu.json')
      .pipe(map(data => {
        for (const localeMenu of data.localeMenus) {
          if (localeMenu.locale === this.localeId) {
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
            return localeMenu.other;
          }
        }
        return [];
      }));
  }
}
