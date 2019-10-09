import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categories} from './categories';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private localeId: string) { }
  public getCategories() {
    return this.http.get<Categories>('/assets/categories.json')
      .pipe(map(data => {
        for (const localeCategory of data.localeCategories) {
          if (localeCategory.locale === this.localeId) {
            return localeCategory.categories;
          }
        }
        return [];
      }));
  }
}
