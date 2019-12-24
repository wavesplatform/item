import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiDocumentationsComponent } from './ui-documentations.component';
import { DefaultComponent } from './default/default.component';
import { PipesModule } from '@libs/pipes/pipes.module';
import { ExternalLinksModule } from '@libs/external-links/external-links.module';

@NgModule({
  declarations: [UiDocumentationsComponent, DefaultComponent],
  exports: [UiDocumentationsComponent],
  imports: [CommonModule, PipesModule, ExternalLinksModule],
})
export class UiDocumentationsModule {}
