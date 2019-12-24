import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact-action',
  templateUrl: './contact-action.component.html',
  styleUrls: ['./contact-action.component.scss'],
})
export class ContactActionComponent implements OnInit, OnDestroy {
  private timer;
  private isBrowser: boolean;

  public circles: string[] = Array.from(Array(15)).map((i) => '0');

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.math();
    }
  }

  math() {
    this.circles = Array.from(
      /* tslint:disable */
      ((Math.random() * 16383 + 16384) >>> 0).toString(2),
      /* tslint:enable */
    );
    this.cdr.markForCheck();

    this.timer = setTimeout(() => {
      this.math();
    }, 3000);
  }

  trackByFn(index) {
    return index;
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
