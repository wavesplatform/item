import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { WINDOW } from '@window';
import { BlockService } from '@block';
import { PageSlug } from '@page';

// Описываем поддерживаемые виды
type View = 'item-protocol' | 'neutrino';

type Theme = 'dark' | 'light';

@Component({
  selector: 'ui-intro',
  templateUrl: './ui-intro.component.html',
  styleUrls: ['./ui-intro.component.scss'],
})
export class UiIntroComponent implements OnInit, OnDestroy {
  @ViewChild('introBlock', { static: false }) introBlock: any;

  @Input() pageSlug: PageSlug = null;
  @Input() blockName: string = null;

  @Input() view: View = null;

  @Input() theme: Theme = 'dark';

  public block: any = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    @Inject(WINDOW) private readonly window: Window,
    private blockService: BlockService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    if (this.pageSlug) {
      this.blockService
        .getBlock(this.pageSlug, this.blockName)
        .pipe(takeUntil(componentDestroyed(this) as any))
        .subscribe((data) => {
          this.block = data;
          this.cdr.markForCheck();
        });
    }
  }

  ngOnDestroy() {}
}
