import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversStandingsComponent } from './drivers-standings.component';

describe('DriversStandingsComponent', () => {
  let component: DriversStandingsComponent;
  let fixture: ComponentFixture<DriversStandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriversStandingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
