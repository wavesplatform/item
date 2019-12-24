import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiLeftColumnComponent } from './ui-left-column.component';
import { DefaultComponent } from './default/default.component';
import { PipesModule } from '@libs/pipes/pipes.module';

@NgModule({
  declarations: [UiLeftColumnComponent, DefaultComponent],
  exports: [UiLeftColumnComponent],
  imports: [CommonModule, PipesModule],
})
export class UiLeftColumnModule {}
