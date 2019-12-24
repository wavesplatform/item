import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'part-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  @Input() public block: any = null;

  @Input() public theme: any = null;

  constructor() {}

  ngOnInit() {}
}
