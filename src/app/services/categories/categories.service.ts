import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categories, CategoryContent} from './categories';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DynamicContent} from '../../dynamic-content/dynamic-content';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private localeId: string) {
  }

  public getCategories() {
    return this.http.get<Categories>('/assets/categories/categories.json')
      .pipe(map(data => {
        for (const localeCategory of data.localeCategories) {
          if (localeCategory.locale === this.localeId) {
            return localeCategory.categories;
          }
        }
        return [];
      }));
  }

  public getCategoryContent(path: string): Observable<DynamicContent[]> {
    return this.http.get<CategoryContent>('/assets/categories/content-' + path + '.json')
      .pipe(map(data => {
        for (const localeCategoryContent of data.localeCategoryContents) {
          if (localeCategoryContent.locale === this.localeId) {
            return localeCategoryContent.elements;
          }
        }
        return [];
      }));
  }

}
