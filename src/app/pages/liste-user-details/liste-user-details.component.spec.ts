import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeUserDetailsComponent } from './liste-user-details.component';

describe('ListeUserDetailsComponent', () => {
  let component: ListeUserDetailsComponent;
  let fixture: ComponentFixture<ListeUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
