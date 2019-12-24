import { Block } from '@block';

export type PageName = string;
export type PageSlug = string;
export type PagePath = string;

export class OriginalPage {
  name: PageName;
  slug: PageSlug;
  path: PagePath;
  blocks: Block[];
  programlists: any[];
}

export class Page {
  name: PageName;
  slug: PageSlug;
  path: PagePath;
  blocks: any;
  programlists: { [s: string]: any };
}
