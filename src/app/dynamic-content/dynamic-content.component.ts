import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DynamicContent} from './dynamic-content';

@Component({
  selector: 'app-dynamic-content',
  templateUrl: './dynamic-content.component.html',
  styleUrls: ['./dynamic-content.component.css']
})
export class DynamicContentComponent implements OnInit {

  @Input() elements: Observable<DynamicContent[]>;

  constructor() {
  }

  ngOnInit() {
  }

}
