import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTextComponent } from './ui-text.component';

describe('UiTextComponent', () => {
  let component: UiTextComponent;
  let fixture: ComponentFixture<UiTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiTextComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
