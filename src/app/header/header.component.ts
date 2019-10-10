import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {CategoriesService} from '../services/categories/categories.service';
import {CartService} from '../services/cart/cart.service';
import {Router, RoutesRecognized} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
import {merge, Subject} from 'rxjs';
import {detectSizeMode, SizeMode} from '../services/responsive/responsive';

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
  activeCategory;
  searchFieldVisible = false;

  constructor(
    private categoriesService: CategoriesService,
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
      .pipe(tap(url => this.currentUrl = url));
    merge(this.categories, this.routerEvents).subscribe(() => this.updateActiveCategory());
    this.cartService.registerOnChange(() => this.updateCartStyle());
    this.outerClickObserver.subscribe(() => this.closeOpenMenus());
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

  private updateActiveCategory() {
    if (typeof this.categoriesArray === 'undefined' || typeof this.currentUrl === 'undefined') {
      return;
    }
    for (const category of this.categoriesArray) {
      if (this.currentUrl.startsWith('/category/' + category.path)) {
        this.activeCategory = category.display;
        return;
      }
    }
    this.activeCategory = '';
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
