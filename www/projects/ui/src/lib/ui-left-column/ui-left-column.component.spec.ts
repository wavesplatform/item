import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLeftColumnComponent } from './ui-left-column.component';

describe('UiLeftColumnComponent', () => {
  let component: UiLeftColumnComponent;
  let fixture: ComponentFixture<UiLeftColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiLeftColumnComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiLeftColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
