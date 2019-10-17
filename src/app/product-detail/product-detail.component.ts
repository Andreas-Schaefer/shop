import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product/product.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ProductDetail} from '../services/product/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productDetail: Observable<ProductDetail>;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.productDetail = this.route.paramMap.pipe(switchMap((params: ParamMap) => this.productService.getProduct(params.get('id'))));
  }

}
