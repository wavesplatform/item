import { Injectable } from '@angular/core';
import { PageData } from './page-data';
import { map, reduce } from 'rxjs/operators';
import { Page } from '@page';
import { Observable, of } from 'rxjs';
import { ContentType } from '@content';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor() {}

  get pages(): Observable<Page[]> {
    return PageData.pipe(
      map((cnt: Page[]) => {
        return cnt.map((page) => {
          return {
            ...page,
            blocks: page.blocks.reduce((orig, block) => {
              orig[block.slug] = block;
              return orig;
            }, {}),
            programlists: page.programlists.reduce((orig, programlist) => {
              orig[programlist.slug] = programlist;
              return orig;
            }, {}),
          };
        });
      }),
    );
  }

  getPages(slugName): Observable<Page[]> {
    return this.pages;
  }

  getPageBySlug() {
    return this.pages.pipe(
      reduce((orig, pages) => {
        // Костыль при отключении бека
        return pages[0];
      }, {}),
    );
  }

  getPage() {
    return PageData;
  }
}
