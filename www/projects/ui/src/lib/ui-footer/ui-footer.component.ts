import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Block, BlockService } from '@block';
import { PageSlug, Page, PageService } from '@page';
import { SiteService, Site } from '@site';

// Описываем поддерживаемые виды
type View = 'default';

// Описываем поддерживаемые виды
type Theme = 'dark' | 'light' | 'violet';

@Component({
  selector: 'ui-footer',
  templateUrl: './ui-footer.component.html',
  styleUrls: ['./ui-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFooterComponent implements OnInit, OnDestroy {
  @ViewChild('footerBlock', { static: false }) footerBlock: any;

  @Input() pageSlug: PageSlug = null;
  @Input() blockName: string = null;

  @Input() view: View = null;
  @Input() theme: Theme = null;

  public site: Site = null;

  public block: Block = null;

  constructor(
    private blockService: BlockService,
    private pageService: PageService,
    private siteService: SiteService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.siteService.site
      .pipe(takeUntil(componentDestroyed(this) as any))
      .subscribe((site: Site) => {
        this.site = site;
        this.cdr.markForCheck();
      });

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
