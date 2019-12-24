import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTwoColumnListComponent } from './ui-two-column-list.component';

describe('UiTwoColumnListComponent', () => {
  let component: UiTwoColumnListComponent;
  let fixture: ComponentFixture<UiTwoColumnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiTwoColumnListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTwoColumnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
