import {Inject, Injectable, LOCALE_ID, OnDestroy} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Product, ProductDetail} from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {

  productCache: Map<string, ProductDetail> = new Map<string, ProductDetail>();

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private localeId: string) {
  }

  public getProduct(path: string): Observable<ProductDetail> {
    if (this.productCache.has(path)) {
      return of(this.productCache.get(path));
    }
    return this.http.get<Product>('/assets/product/product-' + path + '.json')
      .pipe(map(data => {
        for (const localeProduct of data.localeProducts) {
          if (localeProduct.locale === this.localeId) {
            return localeProduct.productDetail;
          }
        }
        return {
          description: '',
          images: [],
          link: '',
          options: [],
          title: ''
        };
      }))
      .pipe(tap(productDetail => this.productCache.set(path, productDetail)));
  }

  ngOnDestroy(): void {
    this.productCache = null;
  }
}
