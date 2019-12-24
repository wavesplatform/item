import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SiteService, Site } from '@site';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';

type Theme = 'waves' | 'enterprise';

@Component({
  selector: 'ui-popup-policy',
  templateUrl: './ui-popup-policy.component.html',
  styleUrls: ['./ui-popup-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPopupPolicyComponent
  implements OnInit, AfterViewInit, OnDestroy {
  public site: Site = null;

  private enabled: boolean;
  public isShow = false;
  public content = null;
  public storageKey = 'popup-policy';
  @Input() theme: Theme = 'waves';

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private siteService: SiteService,
    private cdr: ChangeDetectorRef,
  ) {
    this.enabled = isPlatformBrowser(platformId);
  }

  private getLocal(name: string = this.storageKey): string | null {
    if (!this.enabled) {
      return null;
    }

    return window.localStorage.getItem(name) || null;
  }

  // SetLocal
  private setLocal(name: string = this.storageKey, value: string): void {
    if (!this.enabled) {
      return;
    }
    window.localStorage.setItem(name, value);
  }

  public deleteLocal(name: string = this.storageKey): void {
    if (!this.enabled) {
      return;
    }

    if (this.getLocal(name)) {
      window.localStorage.removeItem(name);
    }
  }

  close() {
    this.setLocal(this.storageKey, 'true');
    this.isShow = false;
    this.cdr.markForCheck();
  }

  ngOnInit() {
    this.siteService.site
      .pipe(takeUntil(componentDestroyed(this) as any))
      .subscribe((site: Site) => {
        this.site = site;
        this.content = (() => {
          const obj = site.label.find((x) => x.name === 'cookiespolicy');
          if (typeof obj !== 'undefined') {
            return obj.text;
          } else {
            return null;
          }
        })();
        this.cdr.markForCheck();
      });
  }

  ngAfterViewInit() {
    if (this.enabled && this.getLocal() === null) {
      setTimeout(() => {
        this.isShow = true;
        this.cdr.markForCheck();
      });
    }
  }

  ngOnDestroy() {}
}
