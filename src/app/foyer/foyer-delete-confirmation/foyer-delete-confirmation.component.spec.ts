import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoyerDeleteConfirmationComponent } from './foyer-delete-confirmation.component';

describe('FoyerDeleteConfirmationComponent', () => {
  let component: FoyerDeleteConfirmationComponent;
  let fixture: ComponentFixture<FoyerDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoyerDeleteConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoyerDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
