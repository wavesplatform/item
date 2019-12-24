import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OriginalPage, Page, PageService, PageSlug } from '@page';
import { isPlatformBrowser } from '@angular/common';
import { WINDOW } from '@window';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('market', { static: false }) market: ElementRef;
  @ViewChild('doc', { static: false }) doc: ElementRef;

  public page: Page;

  public anchors = {};

  public isBrowser;

  constructor(
    private route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
    private router: Router,
    private pageService: PageService,
    @Inject(WINDOW) private readonly window: Window,
    @Inject(PLATFORM_ID) protected platformId: string,
  ) {
    this.pageService
      .getPage()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((page: Page[]) => {
        this.page = page[0];
      });
    this.isBrowser = isPlatformBrowser(platformId);
  }

  goToFragment(url) {
    if (this.anchors && this.anchors[url] && this.anchors[url].nativeElement) {
      this.anchors[url].nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      this.router.navigate(['.'], { fragment: '' });
    }
  }

  ngOnInit() {
    const component = this;
    this.route.fragment
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((url) => {
        this.goToFragment(url);
      });

    if (this.isBrowser) {
      component.window.onload = function(this) {
        component.goToFragment(component.route.snapshot.fragment);
      };
    }
  }

  ngAfterViewInit() {
    this.anchors = {
      market: this.market,
      documentation: this.doc,
    };

    this.cdr.markForCheck();
  }

  ngOnDestroy() {}
}
