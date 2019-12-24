import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'part-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  @Input() public block: any = null;

  constructor() {}

  ngOnInit() {}
}
