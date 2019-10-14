import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuService} from '../services/menu/menu.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() hideMenu: EventEmitter<void> = new EventEmitter<void>();
  products;
  other;
  otherLength = 0;

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.products = this.menuService.getProducts();
    this.other = this.menuService.getOther().pipe(tap(data => {
      this.otherLength = data.length;
    }));
  }

  onHideMenu() {
    this.hideMenu.emit();
  }
}
