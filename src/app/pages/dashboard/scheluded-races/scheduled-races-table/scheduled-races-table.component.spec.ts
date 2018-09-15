import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledRacesTableComponent } from './scheduled-races-table.component';

describe('ScheduledRacesTableComponent', () => {
  let component: ScheduledRacesTableComponent;
  let fixture: ComponentFixture<ScheduledRacesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledRacesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledRacesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
