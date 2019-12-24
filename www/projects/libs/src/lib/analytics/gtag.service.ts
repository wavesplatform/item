import { Inject, Injectable, InjectionToken } from '@angular/core';

// tslint:disable-next-line:ban-types
declare let gtag: Function;

export interface GtagAnalyticsConfig {
  trackingId: string;
  custom_map?: Record<string, string>;
}

export const GTAG_ANALYTICS_CONFIG = new InjectionToken<GtagAnalyticsConfig>(
  'gtag_analytics_config',
);

@Injectable()
export class GtagAnalyticsService {
  constructor(
    @Inject(GTAG_ANALYTICS_CONFIG) private config: GtagAnalyticsConfig,
  ) {}

  public init(): void {
    const { trackingId, ...config } = this.config;
    this.send('config', trackingId, config);
  }

  public pageView(params: {
    page_path: string;
    page_title?: string;
    page_location?: string;
  }): void {
    this.send('config', this.config.trackingId, params);
  }

  public send(...params): void {
    if (typeof gtag === 'function') {
      gtag(...params);
    }
  }
}
