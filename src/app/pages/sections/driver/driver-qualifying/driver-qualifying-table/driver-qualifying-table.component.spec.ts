import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverQualifyingTableComponent } from './driver-qualifying-table.component';

describe('DriverQualifyingTableComponent', () => {
  let component: DriverQualifyingTableComponent;
  let fixture: ComponentFixture<DriverQualifyingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverQualifyingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverQualifyingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
