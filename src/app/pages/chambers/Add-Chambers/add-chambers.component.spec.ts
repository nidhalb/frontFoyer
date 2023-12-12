import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChambersComponent } from './add-chambers.component';

describe('AddChambersComponent', () => {
  let component: AddChambersComponent;
  let fixture: ComponentFixture<AddChambersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChambersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChambersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
