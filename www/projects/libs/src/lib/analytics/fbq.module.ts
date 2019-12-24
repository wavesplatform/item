import { ModuleWithProviders, NgModule } from '@angular/core';
import { FBQ_CONFIG, FbqConfig, FbqService } from '@libs/analytics/fbq.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
})
export class FbqModule {
  static forRoot(config: FbqConfig): ModuleWithProviders {
    return {
      ngModule: FbqModule,
      providers: [{ provide: FBQ_CONFIG, useValue: config }, FbqService],
    };
  }
}
