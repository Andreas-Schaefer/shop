import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DynamicContent} from '../dynamic-content/dynamic-content';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DynamicContentService} from '../services/dynamic/dynamic-content.service';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {

  elements: Observable<DynamicContent[]>;

  constructor(private route: ActivatedRoute, private service: DynamicContentService) {
  }

  ngOnInit() {
    this.elements = this.route.paramMap.pipe(switchMap((params: ParamMap) => this.service.getDynamicContent(params.get('id'))));
  }
}
