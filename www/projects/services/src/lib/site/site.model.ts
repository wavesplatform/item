import { Label } from '../groups/label.model';

export type SiteId = string;
export type SiteName = string;
export type SiteDomain = string;
export type SiteLang = string;

export class Site {
  id: SiteId;
  name: SiteName;
  domain: SiteDomain;
  lang: SiteLang;
  social: SiteSocial[];
  label: Label[];
}

export type SiteSocialName = string;
export type SiteSocialText = string;

export class SiteSocial {
  name: SiteSocialName;
  text: SiteSocialText;
}
