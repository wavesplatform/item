import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PageSlug } from '@page';
import { Block, BlockService } from '@block';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';

// Описываем поддерживаемые темы
type Theme = 'waves' | 'enterprise';

@Component({
  selector: 'ui-text',
  templateUrl: './ui-text.component.html',
  styleUrls: ['./ui-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTextComponent implements OnInit, OnDestroy {
  @Input() pageSlug: PageSlug = null;

  @Input() blockName: string = null;

  @Input() theme: Theme = 'waves';

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
