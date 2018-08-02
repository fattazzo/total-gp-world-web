import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorsComponent } from './constructors.component';

describe('ConstructorsComponent', () => {
  let component: ConstructorsComponent;
  let fixture: ComponentFixture<ConstructorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
