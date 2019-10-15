import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {DynamicElements} from '../../dynamic/dynamic';

@Injectable({
  providedIn: 'root'
})
export class DynamicContentService {

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private localeId: string) {
  }

  public getDynamicContent(path) {
    return this.http.get<DynamicElements>('/assets/dynamic/' + path + '.json')
      .pipe(map(data => {
        for (const localeDynamicElement of data.localeDynamicElements) {
          if (localeDynamicElement.locale === this.localeId) {
            return localeDynamicElement.dynamicElements;
          }
        }
        return [];
      }));
  }
}
