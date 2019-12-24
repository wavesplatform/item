import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  GTAG_ANALYTICS_CONFIG,
  GtagAnalyticsConfig,
  GtagAnalyticsService,
} from '@libs/analytics/gtag.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
})
export class GtagModule {
  static forRoot(config: GtagAnalyticsConfig): ModuleWithProviders {
    return {
      ngModule: GtagModule,
      providers: [
        { provide: GTAG_ANALYTICS_CONFIG, useValue: config },
        GtagAnalyticsService,
      ],
    };
  }
}
