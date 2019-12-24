import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactActionComponent } from './contact-action.component';

describe('ContactActionComponent', () => {
  let component: ContactActionComponent;
  let fixture: ComponentFixture<ContactActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactActionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
