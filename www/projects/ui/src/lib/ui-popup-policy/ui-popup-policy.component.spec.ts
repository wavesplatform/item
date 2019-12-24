import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPopupPolicyComponent } from './ui-popup-policy.component';

describe('UiPopupPolicyComponent', () => {
  let component: UiPopupPolicyComponent;
  let fixture: ComponentFixture<UiPopupPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiPopupPolicyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPopupPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
