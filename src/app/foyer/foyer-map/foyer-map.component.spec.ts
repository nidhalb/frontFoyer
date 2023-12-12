import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoyerMapComponent } from './foyer-map.component';

describe('FoyerMapComponent', () => {
  let component: FoyerMapComponent;
  let fixture: ComponentFixture<FoyerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoyerMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoyerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
