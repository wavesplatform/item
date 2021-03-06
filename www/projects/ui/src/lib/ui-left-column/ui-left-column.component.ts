import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { PageSlug } from '@page';
import { WINDOW } from '@window';
import { BlockService } from '@block';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';

// Описываем поддерживаемые виды
type View = 'default';

// Описываем поддерживаемые виды
type Theme = 'dark' | 'light';

@Component({
  selector: 'ui-left-column',
  templateUrl: './ui-left-column.component.html',
  styleUrls: ['./ui-left-column.component.scss'],
})
export class UiLeftColumnComponent implements OnInit, OnDestroy {
  @ViewChild('twoColumnsBlock', { static: false }) twoColumnsBlock: any;

  @Input() pageSlug: PageSlug = null;
  @Input() blockName: string = null;

  @Input() view: View = null;

  @Input() theme: Theme = null;

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
