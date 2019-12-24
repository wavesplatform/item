import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'part-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  @Input() public block: any = null;

  @Input() public site: any = null;

  @Input() public theme: any = null;

  constructor() {}

  ngOnInit() {}

  trackByFn(index, item) {
    return index;
  }
}
