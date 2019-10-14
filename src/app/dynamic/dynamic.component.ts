import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DynamicContent} from '../dynamic-content/dynamic-content';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {

  elements: Observable<DynamicContent[]>;

  constructor() {
    // TODO load Content from new Service
  }

  ngOnInit() {
  }

}
