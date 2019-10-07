import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../services/categories.service';
import {CartService} from '../services/cart.service';

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
  constructor(
    private categoriesService: CategoriesService,
    private cartService: CartService) { }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories();
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
}
