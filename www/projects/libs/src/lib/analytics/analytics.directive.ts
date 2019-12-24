import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import {
  AnalyticsParams,
  AnalyticsService,
} from '@libs/analytics/analytics.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[libAnalytics]',
})
export class AnalyticsDirective implements OnInit, OnDestroy {
  @Input() public libAnalytics: { event: string } & AnalyticsParams;
  @Input() public analyticsEvent = 'click';

  private listener: () => void;
  private destroy$ = new Subject();

  constructor(
    private analyticsService: AnalyticsService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
  ) {}

  public ngOnInit(): void {
    // Todo потерялась совместимость с текущей версией. Восстановить функционал при необходимости
    // this.addOutputListener(this.analyticsEvent);
    this.listener = this.renderer.listen(
      this.elRef.nativeElement,
      this.analyticsEvent,
      this.onEvent.bind(this),
    );
  }

  // Todo Восстановить функцию
  // private addOutputListener(eventName: string): void {
  //   const componentView = this.viewContainerRef._data.componentView;
  //   if (
  //     componentView &&
  //     componentView.component &&
  //     componentView.component[eventName] instanceof EventEmitter
  //   ) {
  //     /*
  //     TODO может достать контекст из (this.cd as EmbeddedViewRef<any>).context
  //     console.log(
  //       componentView.component,
  //       (this.cd as EmbeddedViewRef<any>).context,
  //     );*/
  //     componentView.component[eventName]
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe((eventData: unknown) => {
  //         this.onEvent();
  //       });
  //   }
  // }

  public ngOnDestroy(): void {
    // Когда мы висим на сслыке где например [routerLink], то, когда навигация
    // срабатывает, компонент начинает дестроиться до того как вызовется этот
    // слушатель. В данном случае нам нужно дождаться всех событий в этом же
    // тике, даже если компонент уже должен быть уничтожен.
    setTimeout(() => {
      this.destroy$.next();
      this.destroy$.complete();
      this.listener();
      this.listener = null;
    });
  }

  public onEvent(): void {
    const { event, ...params } = this.libAnalytics;
    this.analyticsService.event(event, params as AnalyticsParams);
  }
}
