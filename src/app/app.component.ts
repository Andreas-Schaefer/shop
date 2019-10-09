import {Component} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clickObserver: Subject<void> = new Subject<void>();

  onContentClick() {
    this.clickObserver.next();
  }
}
