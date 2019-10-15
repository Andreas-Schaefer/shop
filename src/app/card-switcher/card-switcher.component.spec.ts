import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CardSwitcherComponent} from './card-switcher.component';

describe('CardSwitcherComponent', () => {
  let component: CardSwitcherComponent;
  let fixture: ComponentFixture<CardSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardSwitcherComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
