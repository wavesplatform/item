import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'part-item-protocol',
  templateUrl: './item-protocol.component.html',
  styleUrls: ['./item-protocol.component.scss'],
})
export class ItemProtocolComponent implements OnInit, OnDestroy {
  private isBrowser: boolean;
  private timer = null;

  public circles: string[] = Array.from(Array(12)).map((i) => '0');

  @Input() public block: any = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private cdr: ChangeDetectorRef,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.timer = setInterval(() => {
        this.circles = Array.from(
          /* tslint:disable */
          ((Math.random() * 2047 + 2048) >>> 0).toString(2),
          /* tslint:enable */
        );
        this.cdr.markForCheck();
      }, 2000);
    }
  }

  trackByFn(index) {
    return index;
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
