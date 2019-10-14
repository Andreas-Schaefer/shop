import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cardHeader = 'Card-Header';
  @Input() cardImageSrc = '../../assets/img/card-sample.png';
  @Input() cardImageAlt = 'Card Image';
  @Input() cardDescription = 'Card description text.';

  constructor() {
  }

  ngOnInit() {
  }

}
