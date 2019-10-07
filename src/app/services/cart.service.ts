import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new Map(); // stores product id as key and number as value
  registeredChangeFunctions = [];
  constructor() {}

  public registerOnChange(changeFunction: () => void) {
    this.registeredChangeFunctions.push(changeFunction);
  }

  public triggerChangeFunctions() {
    this.registeredChangeFunctions.forEach(changeFunction => changeFunction());
  }

  public addItem(product, count) {
    if (count === 0) {
      return;
    }
    if (!this.cart.has(product.id)) {
      this.cart.set(product.id, count);
    } else {
      const currentCount = this.cart.get(product.id);
      this.cart.set(product.id, currentCount + count);
    }
    this.triggerChangeFunctions();
  }

  public removeItem(product, count) {
    if (count === 0) {
      return;
    }
    if (this.cart.has(product.id)) {
      if (this.cart.get(product.id) <= count) {
        this.cart.delete(product.id);
      } else {
        const currentCount = this.cart.get(product.id);
        this.cart.set(product.id, currentCount - count);
      }
    }
    this.triggerChangeFunctions();
  }

  public isEmpty() {
    return this.cart.size === 0;
  }

  public clearCart() {
    this.cart.clear();
    this.triggerChangeFunctions();
  }

  public getCart() {
    return this.cart;
  }
}
