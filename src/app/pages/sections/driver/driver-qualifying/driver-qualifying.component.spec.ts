import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverQualifyingComponent } from './driver-qualifying.component';

describe('DriverQualifyingComponent', () => {
  let component: DriverQualifyingComponent;
  let fixture: ComponentFixture<DriverQualifyingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverQualifyingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverQualifyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
