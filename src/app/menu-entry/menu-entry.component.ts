import {Component, Input, OnInit} from '@angular/core';
import {Menu} from '../services/menu/menus';

@Component({
  selector: 'app-menu-entry',
  templateUrl: './menu-entry.component.html',
  styleUrls: ['./menu-entry.component.css']
})
export class MenuEntryComponent implements OnInit {

  @Input() menuEntry: Menu;
  @Input() level: number;
  childrenVisible = false;

  constructor() {
  }

  ngOnInit() {
  }

  onEntryClick() {
    this.childrenVisible = !this.childrenVisible;
  }
}
