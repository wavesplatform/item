import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTwoColumnComponent } from './ui-two-column.component';

describe('UiTwoColumnComponent', () => {
  let component: UiTwoColumnComponent;
  let fixture: ComponentFixture<UiTwoColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiTwoColumnComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTwoColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
