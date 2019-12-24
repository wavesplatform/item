import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeutrinoComponent } from './neutrino.component';

describe('NeutrinoComponent', () => {
  let component: NeutrinoComponent;
  let fixture: ComponentFixture<NeutrinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NeutrinoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeutrinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
