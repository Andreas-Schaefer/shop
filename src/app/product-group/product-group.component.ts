import {Component, HostListener, OnInit} from '@angular/core';
import {detectSizeMode, SizeMode} from '../services/responsive/responsive';
import {ProductsService} from '../services/products/products.service';
import {Product} from '../services/products/products';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DynamicContent} from '../dynamic-content/dynamic-content';

@Component({
  selector: 'app-page',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent implements OnInit {

  sizeMode: SizeMode = SizeMode.DESKTOP;
  elements: Observable<DynamicContent[]>;
  products: Observable<Product[]>;
  cardStyle;
  productsLength = 0;

  constructor(private productsService: ProductsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sizeMode = detectSizeMode(window.innerWidth);
    this.updateCardStyle();
    this.elements = this.route.paramMap.pipe(switchMap((params: ParamMap) =>
      this.productsService
        .getProducts(params.get('id'))
        .pipe(map(productContent => productContent.elements))));
    this.products = this.route.paramMap.pipe(switchMap((params: ParamMap) =>
      this.productsService
        .getProducts(params.get('id'))
        .pipe(map(productContent => productContent.products))
        .pipe(tap(products => {
          this.productsLength = products.length;
        }))));
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.sizeMode = detectSizeMode(window.innerWidth);
    this.updateCardStyle();
  }

  private updateCardStyle() {
    this.cardStyle = this.sizeMode === SizeMode.MOBILE ? 'one-row' : this.sizeMode === SizeMode.TABLET ? 'two-column' : 'three-column';
  }
}
