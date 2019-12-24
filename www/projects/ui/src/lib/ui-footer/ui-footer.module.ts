import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiFooterComponent } from './ui-footer.component';
import { ExternalLinksModule } from '@libs/external-links/external-links.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from '@libs/pipes/pipes.module';
import { DefaultComponent } from './default/default.component';

@NgModule({
  declarations: [UiFooterComponent, DefaultComponent],
  exports: [UiFooterComponent],
  imports: [CommonModule, ExternalLinksModule, RouterModule, PipesModule],
})
export class UiFooterModule {}
