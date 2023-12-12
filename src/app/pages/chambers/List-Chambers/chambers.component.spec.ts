import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambersComponent } from './chambers.component';

describe('ChambersComponent', () => {
  let component: ChambersComponent;
  let fixture: ComponentFixture<ChambersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChambersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChambersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
