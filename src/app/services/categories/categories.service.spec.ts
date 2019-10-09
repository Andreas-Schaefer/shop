import {TestBed} from '@angular/core/testing';

import {CategoriesService} from './categories.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Category} from './categories';
import {LOCALE_ID} from '@angular/core';

describe('CategoriesService', () => {
  const mockedServiceData = getMockedServiceData();

  it('should be created', () => {
    configureTestBedForLocale('en-US');

    expect(TestBed.get(CategoriesService)).toBeTruthy();
  });

  it('should return "en-US" locale categories', () => {
    configureTestBedForLocale('en-US');

    createObservedCheck(TestBed.get(CategoriesService), getEnUsCategories());

    executeServiceCall(mockedServiceData);
  });

  it('should return "de" locale categories', () => {
    configureTestBedForLocale('de');

    createObservedCheck(TestBed.get(CategoriesService), getDeCategories());

    executeServiceCall(mockedServiceData);
  });
});

function configureTestBedForLocale(locale) {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [{provide: LOCALE_ID, useValue: locale}]
  });
}

function createObservedCheck(service: CategoriesService, expectedCategories: Category[]) {
  service.getCategories().subscribe(data => {
    expect(data).toEqual(expectedCategories);
  });
}

function executeServiceCall(mockedServiceData) {
  const httpTestingController = TestBed.get(HttpTestingController);
  const request = httpTestingController.expectOne('/assets/categories.json');

  expect(request.request.method).toEqual('GET');

  request.flush(mockedServiceData);

  httpTestingController.verify();
}

function getDeCategories() {
  return [
    {
      path: '/cat1',
      display: 'Kategorie 1'
    },
    {
      path: '/cat2',
      display: 'Kategorie 2'
    },
    {
      path: '/cat3',
      display: 'Kategorie 3'
    },
    {
      path: '/cat4',
      display: 'Kategorie 4'
    }
  ];
}

function getEnUsCategories() {
  return [
    {
      path: '/cat1',
      display: 'Category 1'
    },
    {
      path: '/cat2',
      display: 'Category 2'
    },
    {
      path: '/cat3',
      display: 'Category 3'
    },
    {
      path: '/cat4',
      display: 'Category 4'
    }
  ];
}

function getMockedServiceData() {
  return {
    localeCategories: [
      {
        locale: 'en-US',
        categories: [
          {
            path: '/cat1',
            display: 'Category 1'
          },
          {
            path: '/cat2',
            display: 'Category 2'
          },
          {
            path: '/cat3',
            display: 'Category 3'
          },
          {
            path: '/cat4',
            display: 'Category 4'
          }
        ]
      },
      {
        locale: 'de',
        categories: [
          {
            path: '/cat1',
            display: 'Kategorie 1'
          },
          {
            path: '/cat2',
            display: 'Kategorie 2'
          },
          {
            path: '/cat3',
            display: 'Kategorie 3'
          },
          {
            path: '/cat4',
            display: 'Kategorie 4'
          }
        ]
      }
    ]
  };
}
