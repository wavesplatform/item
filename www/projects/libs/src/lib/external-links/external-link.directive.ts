import {
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  /* tslint:disable */
  selector: 'a:not([routerLink])',
  /* tslint:enable */
})
export class ExternalLinkDirective implements OnInit, OnChanges {
  @Input() href: string;
  @Input() target: string;
  @Input() rel: string;
  @HostBinding('attr.target') public targetBinding: string;
  @HostBinding('attr.rel') public relBinding: string;

  constructor(
    private readonly elRef: ElementRef,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  ngOnInit(): void {
    this.handleAttributes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleAttributes();
  }

  private handleAttributes(): void {
    const location = this.document.location;
    const link = this.elRef.nativeElement as HTMLAnchorElement;

    const foreignDomain =
      link.host !== location.host || link.href.indexOf('.pdf') > 0;

    if (foreignDomain) {
      this.targetBinding = this.target ? this.target : '_blank';

      this.relBinding = Array.from(
        // rel="nofollow noopener noreferrer"
        new Set(
          (this.rel || '')
            .split(' ')
            .concat('noopener', 'noreferrer', 'nofollow'),
        ),
      )
        .join(' ')
        .trim();
    }
  }
}
