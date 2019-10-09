import {Directive, Input, NgZone, OnInit, Renderer2} from '@angular/core';
import {Observable} from 'rxjs';

/**
 * These directive allows to set the focus on a component with the .
 */

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit {
  @Input() cssSelector: string;
  @Input() focusObserver: Observable<void>;

  constructor(private ngZone: NgZone, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.focusObserver.subscribe(() => this.setFocus());
  }

  setFocus() {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.renderer.selectRootElement(this.cssSelector).focus();
      }, 0);
    });
  }

}
