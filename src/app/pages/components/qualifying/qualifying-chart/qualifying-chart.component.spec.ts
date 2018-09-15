import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualifyingChartComponent } from './qualifying-chart.component';

describe('QualifyingChartComponent', () => {
  let component: QualifyingChartComponent;
  let fixture: ComponentFixture<QualifyingChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QualifyingChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualifyingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
