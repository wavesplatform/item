import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PageSlug } from '@page';
import { Block, BlockService } from '@block';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';

type View = 'default' | 'simple';

// Описываем поддерживаемые темы
type Theme = 'dark' | 'light' | 'violet';

@Component({
  selector: 'ui-two-column-list',
  templateUrl: './ui-two-column-list.component.html',
  styleUrls: ['./ui-two-column-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTwoColumnListComponent implements OnInit, OnDestroy {
  @ViewChild('twoColumnListBlock', { static: false }) twoColumnListBlock: any;

  @Input() blockName = 'participate';

  @Input() pageSlug: PageSlug = null;

  @Input() theme: Theme = 'light';

  @Input() view: View = 'default';

  public block: Block = null;

  constructor(
    private blockService: BlockService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    if (this.pageSlug) {
      this.blockService
        .getBlock(this.pageSlug, this.blockName)
        .pipe(takeUntil(componentDestroyed(this) as any))
        .subscribe((data: Block) => {
          this.block = data;
          this.cdr.markForCheck();
        });
    }
  }

  ngOnDestroy() {}
}
