import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDocumentationsComponent } from './ui-documentations.component';

describe('UiDocumentationsComponent', () => {
  let component: UiDocumentationsComponent;
  let fixture: ComponentFixture<UiDocumentationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiDocumentationsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiDocumentationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
