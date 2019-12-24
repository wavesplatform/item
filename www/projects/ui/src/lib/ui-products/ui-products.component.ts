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
type Theme = 'default' | 'item-protocol';

@Component({
  selector: 'ui-products',
  templateUrl: './ui-products.component.html',
  styleUrls: ['./ui-products.component.scss'],
})
export class UiProductsComponent implements OnInit, OnDestroy {
  @ViewChild('productsBlock', { static: false }) productsBlock: any;

  @Input() pageSlug: PageSlug = null;
  @Input() blockName: string = null;
  @Input() theme: Theme = 'default';

  @Input() view: View = null;

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
