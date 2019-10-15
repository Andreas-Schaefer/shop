import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductContent, Products} from './products';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productCache: Map<string, any>; // <id/data> caches info about products

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private localeId: string) {
  }

  public getProducts(path: string): Observable<ProductContent> {
    return this.http.get<Products>('/assets/products/products-' + path + '.json')
      .pipe(map(data => {
        for (const localeProduct of data.localeProducts) {
          if (localeProduct.locale === this.localeId) {
            return localeProduct.content;
          }
        }
        return {elements: [], products: []};
      }));
  }

  public getDisplayForPath(path: string): string {
    // TODO call Backend-Service for real products and ask for detail
    return '';
  }
}
