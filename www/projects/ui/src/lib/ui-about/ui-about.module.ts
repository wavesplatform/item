import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiAboutComponent } from './ui-about.component';
import { PipesModule } from '@libs/pipes/pipes.module';
import { ExternalLinksModule } from '@libs/external-links/external-links.module';

@NgModule({
  declarations: [UiAboutComponent],
  exports: [UiAboutComponent],
  imports: [CommonModule, PipesModule, ExternalLinksModule],
})
export class UiAboutModule {}
