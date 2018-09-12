import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesSwitcherComponent } from './themes-switcher.component';

describe('ThemesSwitcherComponent', () => {
  let component: ThemesSwitcherComponent;
  let fixture: ComponentFixture<ThemesSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemesSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
