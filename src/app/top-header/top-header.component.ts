import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {

  categories = [];
  constructor() { }

  ngOnInit() {
    for (let i = 1; i < 5; i++) {
      this.categories.push({link: 'cat' + i, label: 'Kategorie ' + i});
    }
  }

  onMenu() {
  }

  onSearch() {
  }

  onCart() {
  }
}
