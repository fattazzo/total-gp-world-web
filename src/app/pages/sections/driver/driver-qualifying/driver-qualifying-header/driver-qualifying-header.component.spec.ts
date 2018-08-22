import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverQualifyingHeaderComponent } from './driver-qualifying-header.component';

describe('DriverQualifyingHeaderComponent', () => {
  let component: DriverQualifyingHeaderComponent;
  let fixture: ComponentFixture<DriverQualifyingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverQualifyingHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverQualifyingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
