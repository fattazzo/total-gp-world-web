import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsChartsComponent } from './results-charts.component';

describe('ResultsChartsComponent', () => {
  let component: ResultsChartsComponent;
  let fixture: ComponentFixture<ResultsChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
