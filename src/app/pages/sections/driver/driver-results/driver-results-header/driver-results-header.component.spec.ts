import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverResultsHeaderComponent } from './driver-results-header.component';

describe('DriverResultsHeaderComponent', () => {
  let component: DriverResultsHeaderComponent;
  let fixture: ComponentFixture<DriverResultsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverResultsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverResultsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
