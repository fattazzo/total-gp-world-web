import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversStTableComponent } from './drivers-st-table.component';

describe('DriversStTableComponent', () => {
  let component: DriversStTableComponent;
  let fixture: ComponentFixture<DriversStTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DriversStTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversStTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
