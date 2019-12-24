import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiTextComponent } from './ui-text.component';
import { PipesModule } from '@libs/pipes/pipes.module';
import { ExternalLinksModule } from '@libs/external-links/external-links.module';

@NgModule({
  declarations: [UiTextComponent],
  exports: [UiTextComponent],
  imports: [CommonModule, PipesModule, ExternalLinksModule],
})
export class UiTextModule {}
