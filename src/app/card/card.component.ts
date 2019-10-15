import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cardHeader;
  @Input() cardImageSrc;
  @Input() cardImageAlt;
  @Input() cardDescription;
  @Input() cardLink;

  constructor() {
  }

  ngOnInit() {
  }

}
