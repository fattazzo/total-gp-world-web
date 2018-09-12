import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualifyingTableComponent } from './qualifying-table.component';

describe('QualifyingTableComponent', () => {
  let component: QualifyingTableComponent;
  let fixture: ComponentFixture<QualifyingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QualifyingTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualifyingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
