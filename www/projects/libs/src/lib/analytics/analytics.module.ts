import { ModuleWithProviders, NgModule } from '@angular/core';
import { AnalyticsDirective } from './analytics.directive';
import {
  AnalyticsDevService,
  AnalyticsNopeService,
  AnalyticsService,
} from '@libs/analytics/analytics.service';
import { Metrika } from 'ng-yandex-metrika';
import { GtagAnalyticsService } from '@libs/analytics/gtag.service';
import { FbqService } from '@libs/analytics/fbq.service';

export const metrikaMock = { fireEvent: () => {} };
export const gtagMock = { init: () => {}, send: () => {}, pageview: () => {} };
export const fbqMock = {
  init: () => {},
  track: () => {},
  trackCustom: () => {},
  pageview: () => {},
};

@NgModule({
  imports: [],
  declarations: [AnalyticsDirective],
  exports: [AnalyticsDirective],
})
export class AnalyticsModule {
  static forRoot(isProduction: boolean): ModuleWithProviders {
    return {
      ngModule: AnalyticsModule,
      providers: !isProduction
        ? [
            { provide: AnalyticsService, useClass: AnalyticsDevService },
            { provide: Metrika, useValue: metrikaMock },
            { provide: GtagAnalyticsService, useValue: gtagMock },
            { provide: FbqService, useValue: fbqMock },
          ]
        : [],
    };
  }

  static forDisabled(): ModuleWithProviders {
    return {
      ngModule: AnalyticsModule,
      providers: [
        { provide: AnalyticsService, useClass: AnalyticsNopeService },
        { provide: Metrika, useValue: metrikaMock },
        { provide: GtagAnalyticsService, useValue: gtagMock },
        { provide: FbqService, useValue: fbqMock },
      ],
    };
  }
}
