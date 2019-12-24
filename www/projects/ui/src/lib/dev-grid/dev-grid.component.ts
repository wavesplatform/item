import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  Input,
  isDevMode,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'ui-dev-grid',
  templateUrl: './dev-grid.component.html',
  styleUrls: ['./dev-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevGridComponent implements OnInit {
  @HostBinding('class.dev-mode') devPageMode: boolean = isDevMode();
  @Input() enabled: boolean;
  public storageKey = 'dev-grid';
  public isShow = false;
  private cssClass = 'dev-mode';

  private readonly html: any;

  constructor(
    public renderer: Renderer2,
    @Inject(DOCUMENT) document,
    @Inject(PLATFORM_ID) private platformId,
    public cdr: ChangeDetectorRef,
  ) {
    this.html = document.documentElement;
    this.enabled = isPlatformBrowser(platformId);
  }

  private getLocal(name: string = this.storageKey): string | null {
    if (!this.enabled) {
      return null;
    }

    return window.localStorage.getItem(name) || null;
  }

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

  ngOnInit() {
    this.devPageMode = isDevMode();
    if (this.enabled && this.devPageMode) {
      setTimeout(() => {
        this.isShow = true;
        this.cdr.markForCheck();
      });
      if (this.getLocal() !== null) {
        this.renderer.addClass(this.html, this.cssClass);
      } else {
        this.renderer.removeClass(this.html, this.cssClass);
      }
    }
  }

  toggleClassBody() {
    if (!this.enabled) {
      return;
    }
    const hasClass = this.html.classList.contains(this.cssClass);
    if (hasClass) {
      this.renderer.removeClass(this.html, this.cssClass);
      this.deleteLocal(this.storageKey);
    } else {
      this.renderer.addClass(this.html, this.cssClass);
      this.setLocal(this.storageKey, 'true');
    }
  }
}
