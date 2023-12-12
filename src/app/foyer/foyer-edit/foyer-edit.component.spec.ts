import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoyerEditComponent } from './foyer-edit.component';

describe('FoyerEditComponent', () => {
  let component: FoyerEditComponent;
  let fixture: ComponentFixture<FoyerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoyerEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoyerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
