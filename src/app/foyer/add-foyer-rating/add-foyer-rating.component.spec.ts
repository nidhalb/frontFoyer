import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoyerRatingComponent } from './add-foyer-rating.component';

describe('AddFoyerRatingComponent', () => {
  let component: AddFoyerRatingComponent;
  let fixture: ComponentFixture<AddFoyerRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFoyerRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFoyerRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
