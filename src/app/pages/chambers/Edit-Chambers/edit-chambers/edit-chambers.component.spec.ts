import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChambersComponent } from './edit-chambers.component';

describe('EditChambersComponent', () => {
  let component: EditChambersComponent;
  let fixture: ComponentFixture<EditChambersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChambersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditChambersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
