import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {CategoriesService} from '../services/categories/categories.service';
import {CartService} from '../services/cart/cart.service';
import {Router, RoutesRecognized} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
import {merge, Subject} from 'rxjs';
import {detectSizeMode, SizeMode} from '../services/responsive/responsive';
import {MenuService} from '../services/menu/menu.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() outerClickObserver;
  @Output() showShadow = new EventEmitter<boolean>();
  searchFocusObserver: Subject<void> = new Subject<void>();

  sizeMode: SizeMode = SizeMode.DESKTOP;

  menuOpened = false;
  categoriesOpened = false;

  styleCart = 'header-cart-empty';
  categories;
  categoriesArray;
  currentUrl;
  routerEvents;
  activePage;
  searchFieldVisible = false;

  constructor(
    private categoriesService: CategoriesService,
    private menuService: MenuService,
    private cartService: CartService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.sizeMode = detectSizeMode(window.innerWidth);
    this.categories = this.categoriesService.getCategories()
      .pipe(tap(value => this.fillCategories(value)));
    this.routerEvents = this.router.events
      .pipe(filter(event => event instanceof RoutesRecognized))
      .pipe(map((value: RoutesRecognized) => value.urlAfterRedirects))
      .pipe(tap(url => this.currentUrl = url))
      .pipe(tap(() => this.scrollToTop()));
    merge(this.categories, this.routerEvents).subscribe(() => this.updateActivePage());
    this.cartService.registerOnChange(() => this.updateCartStyle());
    this.outerClickObserver.subscribe(() => this.closeOpenMenus());
    this.updateActivePage();
  }

  private scrollToTop() {
    // because of responsive styling with fixed/absolute containers scrolling only works
    // when the right container is scrolled.
    // window.scroll(0, 0);
    if (this.sizeMode === SizeMode.MOBILE) {
      window.document.getElementsByClassName('header-container')[0].scrollIntoView();
    } else {
      const contentContainer = window.document.getElementsByClassName('content-container')[0];
      if (contentContainer.firstChild != null && contentContainer.firstChild instanceof Element) {
        const firstChild: Element = contentContainer.firstChild;
        firstChild.scrollIntoView();
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.sizeMode = detectSizeMode(window.innerWidth);
    if (this.sizeMode !== SizeMode.MOBILE) {
      this.categoriesOpened = false;
    }
    if (this.sizeMode === SizeMode.DESKTOP) {
      this.menuOpened = false;
      this.showShadow.emit(false);
    }
  }

  updateCartStyle() {
    if (this.cartService.isEmpty()) {
      this.styleCart = 'header-cart-empty';
    } else {
      this.styleCart = 'header-cart-filled';
    }
  }

  onMenu() {
    this.menuOpened = !this.menuOpened;
    this.showShadow.emit(this.menuOpened);
  }

  onOpenSearch() {
    this.searchFieldVisible = true;
    this.searchFocusObserver.next();
  }

  onSearch(value) {
    if (value.length > 0) {
      this.executeSearch(value);
    } else {
      this.searchFieldVisible = false;
    }
  }

  onCart() {
  }

  onCategories() {
    this.categoriesOpened = !this.categoriesOpened;
  }

  private updateActivePage() {
    if (typeof this.currentUrl === 'undefined') {
      return;
    }
    if (this.currentUrl.startsWith('/category')) {
      if (typeof this.categoriesArray === 'undefined') {
        return;
      }
      this.activePage = this.readCurrentPageFromCategories();
    } else {
      const searchPath = this.currentUrl.substring(1);  // the first '/' from the current url must be removed!
      this.activePage = this.menuService.getDisplayForPath(this.currentUrl.substring(1));
    }
  }

  private readCurrentPageFromCategories() {
    for (const category of this.categoriesArray) {
      if (this.currentUrl.startsWith('/category/' + category.path)) {
        return category.display;
      }
    }
    return '';
  }

  private closeOpenMenus() {
    this.menuOpened = false;
    this.showShadow.emit(false);
    this.categoriesOpened = false;
  }

  private fillCategories(value) {
    this.categoriesArray = value;
  }

  private executeSearch(value) {
    this.searchFieldVisible = false;
    alert('search for "' + value + '" executed');
  }
}
