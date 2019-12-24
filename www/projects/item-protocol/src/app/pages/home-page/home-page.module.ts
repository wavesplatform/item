import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { UiTwoColumnListModule } from '@ui/ui-two-column-list/ui-two-column-list.module';
import { UiAboutModule } from '@ui/ui-about/ui-about.module';
import { UiHeaderModule } from '@ui/ui-header/ui-header.module';
import { UiFooterModule } from '@ui/ui-footer/ui-footer.module';
import { LogoModule } from '../../logo/logo.module';
import { UiContactsModule } from '@ui/ui-contacts/ui-contacts.module';
import { UiTextModule } from '@ui/ui-text/ui-text.module';
import { UiIntroModule } from '@ui/ui-intro/ui-intro.module';
import { UiProductsModule } from '@ui/ui-products/ui-products.module';
import { UiDocumentationsModule } from '@ui/ui-documentations/ui-documentations.module';
import { ContactActionModule } from '../../contact-action/contact-action.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    UiTwoColumnListModule,
    UiAboutModule,
    UiHeaderModule,
    UiFooterModule,
    LogoModule,
    UiContactsModule,
    UiTextModule,
    UiIntroModule,
    UiProductsModule,
    UiDocumentationsModule,
    ContactActionModule,
  ],
  providers: [],
})
export class HomePageModule {}
