import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveHtmlPipe } from './save-html.pipe';
import { CheckArrayPipe } from './check-array.pipe';
import { SaveInnerHtmlPipe } from './save-inner-html.pipe';
import { SaveSrcImagePipe } from '@libs/pipes/save-src-image.pipe';

@NgModule({
  declarations: [
    SaveHtmlPipe,
    CheckArrayPipe,
    SaveInnerHtmlPipe,
    SaveSrcImagePipe,
  ],
  imports: [CommonModule],
  exports: [SaveHtmlPipe, CheckArrayPipe, SaveInnerHtmlPipe, SaveSrcImagePipe],
})
export class PipesModule {}
