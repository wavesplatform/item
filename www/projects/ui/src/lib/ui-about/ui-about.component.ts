import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PageSlug } from '@page';
import { Block, BlockService } from '@block';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { takeUntil } from 'rxjs/operators';

// Описываем поддерживаемые темы
type Theme = 'light' | 'gray' | 'dark';

@Component({
  selector: 'ui-about',
  templateUrl: './ui-about.component.html',
  styleUrls: ['./ui-about.component.scss'],
})
export class UiAboutComponent implements OnInit, OnDestroy {
  @Input() blockName = 'about';

  @Input() pageSlug: PageSlug = null;

  @Input() theme: Theme = 'light';

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

  trackByFn(index) {
    return index;
  }
}
