import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiPopupPolicyComponent } from './ui-popup-policy.component';
import { PipesModule } from '@libs/pipes/pipes.module';
import { ExternalLinksModule } from '@libs/external-links/external-links.module';

@NgModule({
  declarations: [UiPopupPolicyComponent],
  imports: [CommonModule, PipesModule, ExternalLinksModule],
  exports: [UiPopupPolicyComponent],
})
export class UiPopupPolicyModule {}
