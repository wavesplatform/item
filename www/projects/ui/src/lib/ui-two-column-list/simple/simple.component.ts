import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'part-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
})
export class SimpleComponent implements OnInit {
  @Input() public block: any = null;

  @Input() public theme: any = null;

  constructor() {}

  ngOnInit() {}

  trackByFn(index) {
    return index;
  }
}
