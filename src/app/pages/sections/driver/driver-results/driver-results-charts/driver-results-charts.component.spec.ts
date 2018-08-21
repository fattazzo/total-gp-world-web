import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverResultsChartsComponent } from './driver-results-charts.component';

describe('DriverResultsBackComponent', () => {
  let component: DriverResultsChartsComponent;
  let fixture: ComponentFixture<DriverResultsChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DriverResultsChartsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverResultsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
