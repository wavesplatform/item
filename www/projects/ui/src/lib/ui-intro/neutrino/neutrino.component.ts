import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'part-neutrino',
  templateUrl: './neutrino.component.html',
  styleUrls: ['./neutrino.component.scss'],
})
export class NeutrinoComponent implements OnInit {
  @Input() public block: any = null;

  @Input() public theme: any = null;

  constructor() {}

  ngOnInit() {}
}
