import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualifyingHeaderComponent } from './qualifying-header.component';

describe('QualifyingHeaderComponent', () => {
  let component: QualifyingHeaderComponent;
  let fixture: ComponentFixture<QualifyingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QualifyingHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualifyingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
