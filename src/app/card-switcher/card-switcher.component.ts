import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../services/products/products';
import {Router, RoutesRecognized} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-card-switcher',
  templateUrl: './card-switcher.component.html',
  styleUrls: ['./card-switcher.component.css']
})
export class CardSwitcherComponent implements OnInit {
  @Input() products: Product[];
  current: Product;
  currentIndex = 0;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof RoutesRecognized))
      .subscribe(() => this.currentIndex = 0);
  }

  onPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.current = this.products[this.currentIndex];
    }
  }

  onNext() {
    if (this.currentIndex < this.products.length - 1) {
      this.currentIndex++;
      this.current = this.products[this.currentIndex];
    }
  }

  hasProducts() {
    return typeof this.products !== 'undefined' && this.products !== null && this.products.length > 0;
  }
}
