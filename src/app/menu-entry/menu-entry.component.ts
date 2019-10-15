import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuEntry} from '../services/menu/menus';

@Component({
  selector: 'app-menu-entry',
  templateUrl: './menu-entry.component.html',
  styleUrls: ['./menu-entry.component.css']
})
export class MenuEntryComponent implements OnInit {

  @Input() menuEntry: MenuEntry;
  @Input() level: number;
  @Output() closeMenu = new EventEmitter<void>();
  childrenVisible = false;

  constructor() {
  }

  ngOnInit() {
  }

  onEntryClick() {
    this.childrenVisible = !this.childrenVisible;
    if (typeof this.menuEntry.children === 'undefined' || this.menuEntry.children.length === 0) {
      this.closeMenu.emit();
    }
  }

  onCloseMenu() {
    this.closeMenu.emit();
  }
}
