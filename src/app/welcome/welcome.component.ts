import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart/cart.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private cart: CartService) { }

  ngOnInit() {
  }

  addProductToCart() {
    this.cart.addItem({id: '00001'}, 1);
  }

  removeProductFromCart() {
    this.cart.removeItem({id: '00001'}, 1);
  }
}
