import { Component, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { BlockService, Block } from '@block';
import { PageSlug } from '@page';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'ui-header',
  templateUrl: './ui-header.component.html',
  styleUrls: ['./ui-header.component.scss'],
})
export class UiHeaderComponent implements OnInit, OnDestroy {
  private blockName = 'header';

  @Input() pageSlug: PageSlug = null;

  @Input() anchors: { [s: string]: ElementRef } = {};

  public block: Block = null;

  constructor(private blockService: BlockService) {}

  ngOnInit() {
    if (this.pageSlug) {
      this.blockService
        .getBlock(this.pageSlug, this.blockName)
        .pipe(takeUntil(componentDestroyed(this) as any))
        .subscribe((data: Block) => {
          this.block = data;
        });
    }
  }

  trackByFn(index) {
    return index;
  }

  ngOnDestroy() {}
}
