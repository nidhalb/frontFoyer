import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantAddRatingComponent } from './etudiant-add-rating.component';

describe('EtudiantAddRatingComponent', () => {
  let component: EtudiantAddRatingComponent;
  let fixture: ComponentFixture<EtudiantAddRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudiantAddRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantAddRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
