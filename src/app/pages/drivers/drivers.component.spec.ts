import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversComponent } from './drivers.component';

describe('DriversComponent', () => {
  let component: DriversComponent;
  let fixture: ComponentFixture<DriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
