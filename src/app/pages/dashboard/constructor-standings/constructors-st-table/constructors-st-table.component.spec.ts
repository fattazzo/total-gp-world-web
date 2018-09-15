import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorsStTableComponent } from './constructors-st-table.component';

describe('ConstructorsStTableComponent', () => {
  let component: ConstructorsStTableComponent;
  let fixture: ComponentFixture<ConstructorsStTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructorsStTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorsStTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
