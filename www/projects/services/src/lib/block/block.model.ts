import { Label } from '../groups/label.model';

export type BlockSlug = string;
export type BlocTitle = string;
export type BlockContent = string;
export type BlockDecription = string;
export type BlockListItemList = string;

export class Block {
  labels: { [s: string]: Label } | Label[];
  list: { [s: string]: BlockListItem } | BlockListItem[];
  slug: BlockSlug;
  title: BlocTitle;
  content: BlockContent;
  description: BlockDecription;
  media: BlockMedia[];
}

export type BlockMediaName = string;
export type BlockMediaUrl = string;
export type BlockMediaExt = string;
export class BlockMedia {
  url: BlockMediaUrl;
  ext: BlockMediaExt;
  name: BlockMediaName;
}

export type BlockListItemTitle = string;
export type BlockListItemDescription = string;
export type BlockListItemContent = string;
export type BlockListItemIndex = number;
export type BlockListItemName = string;
export class BlockListJson {
  url?: any;
}

export class BlockListItem {
  title: BlockListItemTitle;
  name: BlockListItemName;
  description: BlockListItemDescription;
  content: BlockListItemContent;
  index: BlockListItemIndex;
  link: BlockListItemList;
  json: BlockListJson;
  // Добавляется при группировке, например в программах
  sub?: BlockListItem;
}
