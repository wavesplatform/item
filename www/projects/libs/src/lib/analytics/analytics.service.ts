import { Injectable, OnDestroy } from '@angular/core';
import { Metrika } from 'ng-yandex-metrika';
import { GtagAnalyticsService } from '@libs/analytics/gtag.service';
import { FbqService } from '@libs/analytics/fbq.service';

export interface AnalyticsParams {
  // tslint:disable:max-union-size
  event_category:
    | 'Profile'
    | 'Quiz'
    | 'Vacancies'
    | 'HackathonDutchblockchainweek'
    | 'Candidate landing'
    | 'Partner landing';
  event_label?: string | number;
  [s: string]: any;
}

export interface AnalyticsServiceInterface {
  event(eventName: string, data?: AnalyticsParams): void;
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsProductionService
  implements AnalyticsServiceInterface, OnDestroy {
  private useYandex = false;
  constructor(
    private ym: Metrika,
    private gtag: GtagAnalyticsService,
    private fbq: FbqService,
  ) {
    gtag.init();
    fbq.init();
  }

  public ngOnDestroy(): void {}

  public event(eventName: string, data?: AnalyticsParams): void {
    this.gtag.send('event', eventName, data);

    if (this.useYandex) {
      this.ym.fireEvent(eventName, { params: data });
    }
  }

  public pageview(path: string): void {
    this.gtag.pageView({
      page_path: path,
      // page_title: 'Angular App',
      // page_location: window.location.href
    });

    // tslint:disable
    // see https://developers.facebook.com/ads/blog/post/v2/2017/05/29/tagging-a-single-page-application-facebook-pixel/?locale=ru_RU
    // tslint:enable
    // By default Facebook Pixel activates the HTML 5 History State API
    // listener. This means that each time a new state appears in the history,
    // such as history.pushState, Facebook Pixel fires a PageView event. Note
    // that due to the way we designed Facebook Pixel's JavaScript code, you
    // cannot fire more than one PageView event explicitly without this
    // listener.
    // this.fbq.pageview();
  }
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsDevService implements AnalyticsServiceInterface {
  public event(eventName: string, data?: AnalyticsParams): void {
    if (typeof window === 'object') {
      window.console.debug('Analytics debug >>', eventName, data);
    }
  }
  public pageview(path: string): void {
    if (typeof window === 'object') {
      window.console.debug('Analytics debug [pageview] >>', path);
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsNopeService implements AnalyticsServiceInterface {
  public event(eventName: string, data?: AnalyticsParams): void {}
  public pageview(path: string): void {}
}

@Injectable({
  providedIn: 'root',
  useClass: AnalyticsProductionService,
})
export abstract class AnalyticsService implements AnalyticsServiceInterface {
  protected constructor(
    private ym: Metrika,
    private gtag: GtagAnalyticsService,
    private fbq: FbqService,
  ) {}
  public abstract event(eventName: string, data?: AnalyticsParams): void;
  public abstract pageview(path: string): void;
}
