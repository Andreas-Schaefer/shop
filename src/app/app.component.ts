import {Component, HostListener, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {detectSizeMode, SizeMode} from './services/responsive/responsive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  clickObserver: Subject<void> = new Subject<void>();
  glassPane = 'glass-pane-hidden';
  sizeMode: SizeMode = SizeMode.DESKTOP;

  ngOnInit() {
    this.sizeMode = detectSizeMode(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.sizeMode = detectSizeMode(window.innerWidth);
  }

  onContentClick() {
    this.clickObserver.next();
  }

  public onShowShadow(show: boolean) {
    if (show) {
      this.glassPane = 'glass-pane';
    } else {
      this.glassPane = 'glass-pane-hidden';
    }
  }

  hideGlassPane() {
    this.clickObserver.next();
  }
}
