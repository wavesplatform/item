import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiProductsComponent } from './ui-products.component';
import { DefaultComponent } from './default/default.component';
import { PipesModule } from '@libs/pipes/pipes.module';

@NgModule({
  declarations: [UiProductsComponent, DefaultComponent],
  exports: [UiProductsComponent],
  imports: [CommonModule, PipesModule],
})
export class UiProductsModule {}
