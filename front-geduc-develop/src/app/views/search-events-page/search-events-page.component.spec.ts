import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEventsPageComponent } from './search-events-page.component';

describe('SearchEventsPageComponent', () => {
  let component: SearchEventsPageComponent;
  let fixture: ComponentFixture<SearchEventsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchEventsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
