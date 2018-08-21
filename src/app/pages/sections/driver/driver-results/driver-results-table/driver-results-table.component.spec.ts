import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverResultsTableComponent } from './driver-results-table.component';

describe('DriverResultsTableComponent', () => {
  let component: DriverResultsTableComponent;
  let fixture: ComponentFixture<DriverResultsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DriverResultsTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
