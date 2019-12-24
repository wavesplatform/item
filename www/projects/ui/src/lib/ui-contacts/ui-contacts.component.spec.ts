import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiContactsComponent } from './ui-contacts.component';

describe('UiContactsComponent', () => {
  let component: UiContactsComponent;
  let fixture: ComponentFixture<UiContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiContactsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
