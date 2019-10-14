import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../services/categories/categories.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {DynamicContent} from '../dynamic-content/dynamic-content';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  elements: Observable<DynamicContent[]>;

  constructor(private categories: CategoriesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.elements = this.route.paramMap.pipe(switchMap((params: ParamMap) => this.categories.getCategoryContent(params.get('id'))));
    // this.elements = this.categories.getCategoryContent(this.route.snapshot.paramMap.get('id'));
  }

}
