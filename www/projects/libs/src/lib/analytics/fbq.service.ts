import { Inject, Injectable, InjectionToken } from '@angular/core';

// tslint:disable-next-line:ban-types
declare let fbq: Function;

export interface FbqConfig {
  fbqId: string;
}

export const FBQ_CONFIG = new InjectionToken<FbqConfig>('fbq_config');

@Injectable()
export class FbqService {
  constructor(@Inject(FBQ_CONFIG) private config: FbqConfig) {}

  public init(): void {
    this.send('init', this.config.fbqId);
    this.track('PageView');
  }

  public pageview(): void {
    this.track('PageView');
  }

  public track(event: string, params?: any): void {
    this.send('track', event, params);
  }

  public trackCustom(event: string, params?: any): void {
    this.send('trackCustom', event, params);
  }

  private send(action: string, event: string, params?: any): void {
    if (typeof fbq === 'function') {
      fbq(action, event, params);
    }
  }
}
