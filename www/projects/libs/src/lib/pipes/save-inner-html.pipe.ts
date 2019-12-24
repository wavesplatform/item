import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'saveInnerHtml',
})
export class SaveInnerHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    if (typeof value === 'string') {
      return this.sanitized.sanitize(1, value.replace(/<\/?(p|div)>/g, ''));
    } else {
      return this.sanitized.sanitize(1, value);
    }
  }
}
