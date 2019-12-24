import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevGridComponent } from './dev-grid.component';

describe('DevGridComponent', () => {
  let component: DevGridComponent;
  let fixture: ComponentFixture<DevGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DevGridComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
