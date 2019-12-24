import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactActionComponent } from './contact-action.component';

@NgModule({
  declarations: [ContactActionComponent],
  exports: [ContactActionComponent],
  imports: [CommonModule],
})
export class ContactActionModule {}
