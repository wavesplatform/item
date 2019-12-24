import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiIntroComponent } from './ui-intro.component';

describe('UiIntroComponent', () => {
  let component: UiIntroComponent;
  let fixture: ComponentFixture<UiIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiIntroComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
