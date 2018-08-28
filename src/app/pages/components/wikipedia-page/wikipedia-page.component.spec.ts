import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikipediaPageComponent } from './wikipedia-page.component';

describe('WikipediaPageComponent', () => {
  let component: WikipediaPageComponent;
  let fixture: ComponentFixture<WikipediaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikipediaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikipediaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
