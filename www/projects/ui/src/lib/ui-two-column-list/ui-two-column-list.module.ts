import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiTwoColumnListComponent } from './ui-two-column-list.component';
import { PipesModule } from '@libs/pipes/pipes.module';
import { ExternalLinksModule } from '@libs/external-links/external-links.module';
import { DefaultComponent } from './default/default.component';
import { SimpleComponent } from './simple/simple.component';

@NgModule({
  declarations: [UiTwoColumnListComponent, DefaultComponent, SimpleComponent],
  exports: [UiTwoColumnListComponent],
  imports: [CommonModule, PipesModule, ExternalLinksModule],
})
export class UiTwoColumnListModule {}
