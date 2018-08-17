import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverResultsChartComponent } from './driver-results-chart.component';

describe('DriverResultsChartComponent', () => {
  let component: DriverResultsChartComponent;
  let fixture: ComponentFixture<DriverResultsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverResultsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverResultsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
