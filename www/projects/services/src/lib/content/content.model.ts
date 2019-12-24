import { Site } from '@site';
import { OriginalPage } from '@page';

export class ContentResponse {
  data: ContentType;
}

export class ContentType {
  site: Site;
  pages: OriginalPage[];
}
