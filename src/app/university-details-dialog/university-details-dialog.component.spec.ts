import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityDetailsDialogComponent } from './university-details-dialog.component';

describe('UniversityDetailsDialogComponent', () => {
  let component: UniversityDetailsDialogComponent;
  let fixture: ComponentFixture<UniversityDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversityDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
