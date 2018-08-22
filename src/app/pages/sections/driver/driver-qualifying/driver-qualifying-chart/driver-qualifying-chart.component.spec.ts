import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverQualifyingChartComponent } from './driver-qualifying-chart.component';

describe('DriverQualifyingChartComponent', () => {
  let component: DriverQualifyingChartComponent;
  let fixture: ComponentFixture<DriverQualifyingChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverQualifyingChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverQualifyingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
