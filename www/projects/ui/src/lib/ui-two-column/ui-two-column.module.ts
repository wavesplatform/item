import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiTwoColumnComponent } from './ui-two-column.component';
import { DefaultComponent } from './default/default.component';
import { PipesModule } from '@libs/pipes/pipes.module';

@NgModule({
  declarations: [UiTwoColumnComponent, DefaultComponent],
  exports: [UiTwoColumnComponent],
  imports: [CommonModule, PipesModule],
})
export class UiTwoColumnModule {}
