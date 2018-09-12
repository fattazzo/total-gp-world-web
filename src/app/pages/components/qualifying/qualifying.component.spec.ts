import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualifyngComponent } from './qualifying.component';

describe('QualifyingComponent', () => {
  let component: QualifyngComponent;
  let fixture: ComponentFixture<QualifyngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QualifyngComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualifyngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
