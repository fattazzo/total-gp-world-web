import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheludedRacesComponent } from './scheluded-races.component';

describe('ScheludedRacesComponent', () => {
  let component: ScheludedRacesComponent;
  let fixture: ComponentFixture<ScheludedRacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheludedRacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheludedRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
