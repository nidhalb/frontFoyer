import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoyerRatingComponent } from './foyer-rating.component';

describe('FoyerRatingComponent', () => {
  let component: FoyerRatingComponent;
  let fixture: ComponentFixture<FoyerRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoyerRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoyerRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
