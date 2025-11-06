import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionDetail } from './suggestion-detail';

describe('SuggestionDetail', () => {
  let component: SuggestionDetail;
  let fixture: ComponentFixture<SuggestionDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
