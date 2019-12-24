import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIntroComponent } from './ui-intro.component';
import { ItemProtocolComponent } from './item-protocol/item-protocol.component';
import { DefaultComponent } from './default/default.component';
import { NeutrinoComponent } from './neutrino/neutrino.component';
import { PipesModule } from '@libs/pipes/pipes.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UiIntroComponent,
    ItemProtocolComponent,
    DefaultComponent,
    NeutrinoComponent,
  ],
  imports: [CommonModule, PipesModule, RouterModule],
  exports: [UiIntroComponent],
})
export class UiIntroModule {}
