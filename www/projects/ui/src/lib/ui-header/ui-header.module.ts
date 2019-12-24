import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiHeaderComponent } from './ui-header.component';
import { ExternalLinksModule } from '@libs/external-links/external-links.module';
import { PipesModule } from '@libs/pipes/pipes.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UiHeaderComponent],
  exports: [UiHeaderComponent, ExternalLinksModule],
  imports: [CommonModule, ExternalLinksModule, PipesModule, RouterModule],
})
export class UiHeaderModule {}
