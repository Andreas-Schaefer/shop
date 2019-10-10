import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuService} from '../services/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() hideMenu: EventEmitter<void> = new EventEmitter<void>();
  menus;

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menus = this.menuService.getMenus();
  }

  onHideMenu() {
    this.hideMenu.emit();
  }
}
