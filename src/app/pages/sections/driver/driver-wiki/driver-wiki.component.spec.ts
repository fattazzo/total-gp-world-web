import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverWikiComponent } from './driver-wiki.component';

describe('DriverWikiComponent', () => {
  let component: DriverWikiComponent;
  let fixture: ComponentFixture<DriverWikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverWikiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
