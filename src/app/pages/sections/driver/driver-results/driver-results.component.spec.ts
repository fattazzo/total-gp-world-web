import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverResultsComponent } from './driver-results.component';

describe('DriverResultsComponent', () => {
  let component: DriverResultsComponent;
  let fixture: ComponentFixture<DriverResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
