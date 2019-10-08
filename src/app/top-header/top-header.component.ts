import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { CartService } from '../services/cart.service';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { Observable, combineLatest, merge } from 'rxjs';
import { Category } from '../services/categories';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {

  styleCategoriesMenuOpen = 'header-categories-menu-open';
  styleCategoriesMenuClose = 'header-categories-menu-close';
  styleCartEmpty = 'header-cart-empty';
  styleCartFilled = 'header-cart-filled';

  styleCategoriesMenu = this.styleCategoriesMenuOpen;
  styleCart = this.styleCartEmpty;
  categories;
  categoriesArray;
  currentUrl;
  routerEvents;
  activeCategory;
  constructor(
    private categoriesService: CategoriesService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories()
      .pipe(tap(value => this.fillCategories(value)));
    this.routerEvents = this.router.events
      .pipe(filter(event => event instanceof RoutesRecognized))
      .pipe(map((value: RoutesRecognized) => value.urlAfterRedirects))
      .pipe(tap(url => this.currentUrl = url));
    merge(this.categories, this.routerEvents).subscribe(value => this.updateActiveCategory());
    this.cartService.registerOnChange(() => this.updateCartStyle());
  }

  updateCartStyle() {
    if (this.cartService.isEmpty()) {
      this.styleCart = this.styleCartEmpty;
    } else {
      this.styleCart = this.styleCartFilled;
    }
  }

  onMenu() {
  }

  onSearch() {
  }

  onCart() {
  }

  onCategories() {
  }

  private getCategoryDisplay(path) {
    for (const category of this.categories) {
      if (category.path === path) {
        console.log('Category to display: ' + category.display);
        return category.display;
      }
    }
  }

  private updateActiveCategory() {
    if (typeof this.categoriesArray === 'undefined' || typeof this.currentUrl === 'undefined') {
      return;
    }
    for (const category of this.categoriesArray) {
      if (this.currentUrl.startsWith('/category/' + category.path)) {
        this.activeCategory = category.display;
        return;
      }
    }
    this.activeCategory = '';
  }

  private fillCategories(value) {
    this.categoriesArray = value;
  }
}
