import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'saveSrcImage',
})
export class SaveSrcImagePipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.sanitize(
      4,
      value.replace(/^.*?src="([^"]*)".*?$/, ''),
    );
  }
}
