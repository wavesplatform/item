import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ExternalLinksModule } from '@libs/external-links/external-links.module';
import { environment } from '../environments/environment';
import { GtagModule } from '@libs/analytics/gtag.module';
import { FbqModule } from '@libs/analytics/fbq.module';
import { DevGridModule } from '@ui/dev-grid/dev-grid.module';
import { WINDOW_PROVIDERS } from '@window';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ExternalLinksModule,
    DevGridModule,
    environment.production && environment.gaTrackingId
      ? GtagModule.forRoot({
          trackingId: environment.gaTrackingId,
          custom_map: {
            dimension1: 'filter_name',
            dimension2: 'filter_value',
            dimension3: 'sharing_method',
            dimension4: 'question_id',
          },
        })
      : [],
    environment.production && environment.fbqId
      ? FbqModule.forRoot({
          fbqId: environment.fbqId,
        })
      : [],
    DevGridModule,
  ],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
