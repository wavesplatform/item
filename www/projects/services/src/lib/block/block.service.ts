import { Injectable } from '@angular/core';
import { SiteService } from '@site';
import { Block } from './block.model';
import { PageService, Page } from '@page';
import { map, publishReplay, refCount, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  private blocksItems: { [s: string]: Observable<Block> } = {};

  constructor(private pageService: PageService) {}

  getBlock(pageName, blockName): Observable<Block> {
    const index = pageName + '-' + blockName;

    if (!this.blocksItems[index]) {
      this.blocksItems[index] = this.pageService.getPageBySlug().pipe(
        map((element: Page) => {
          return element.blocks
            ? this.convert(element.blocks[blockName])
            : null;
        }),
        publishReplay(1),
        refCount(),
      );
    }

    return this.blocksItems[index];
  }

  convert(data: any) {
    if (data instanceof Array) {
      return data.reduce((orig, itemOfArray) => {
        const key = itemOfArray.slug || itemOfArray.name;
        if (orig[key] instanceof Array) {
          orig[key].push(this.convert(itemOfArray));
        } else if (!!orig[key]) {
          orig[key] = [orig[key]].concat([this.convert(itemOfArray)]);
        } else {
          orig[key] = this.convert(itemOfArray);
        }
        return orig;
      }, {});
    } else if (data instanceof Object) {
      return Object.keys(data).reduce((orig, itemKey) => {
        if (itemKey === 'labels' && !!data.convertLabelsToObjectByName) {
          orig[itemKey] = this.convert(data[itemKey]);
        } else if (itemKey === 'list' && !!data.convertListToObjectByName) {
          orig[itemKey] = this.convert(data[itemKey]);
        } else {
          orig[itemKey] = data[itemKey];
        }

        return orig;
      }, data);
    }

    return data;
  }
}
