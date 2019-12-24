import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiContactsComponent } from './ui-contacts.component';
import { PipesModule } from '@libs/pipes/pipes.module';
import { ExternalLinksModule } from '@libs/external-links/external-links.module';
import { DefaultComponent } from './default/default.component';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  declarations: [UiContactsComponent, DefaultComponent, ActionsComponent],
  exports: [UiContactsComponent],
  imports: [CommonModule, PipesModule, ExternalLinksModule],
})
export class UiContactsModule {}
