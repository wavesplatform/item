import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { PageSlug } from '@page';
import { Block, BlockService } from '@block';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';

// Описываем поддерживаемые темы
type Theme = 'dark' | 'light';

type View = 'default';

@Component({
  selector: 'ui-contacts',
  templateUrl: './ui-contacts.component.html',
  styleUrls: ['./ui-contacts.component.scss'],
})
export class UiContactsComponent implements OnInit, OnDestroy {
  @Input() blockName = 'registration';

  @Input() pageSlug: PageSlug = null;

  @Input() theme: Theme = 'dark';

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

  trackByFunc(index) {
    return index;
  }
}
