import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProtocolComponent } from './item-protocol.component';

describe('ItemProtocolComponent', () => {
  let component: ItemProtocolComponent;
  let fixture: ComponentFixture<ItemProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemProtocolComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
