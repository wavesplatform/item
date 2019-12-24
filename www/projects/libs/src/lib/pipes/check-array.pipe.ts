import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkArray',
  pure: false,
})
export class CheckArrayPipe implements PipeTransform {
  transform(item, check) {
    const length = item.length;
    let flag = true;
    for (let i = 0; i < length; i++) {
      if (!item[i][check]) {
        flag = false;
        break;
      }
    }
    return flag;
  }
}
