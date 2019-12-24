import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { DOCUMENT } from '@angular/common';

export interface SeoData {
  title: string;
  description: string;
  keywords: string;
  siteName: string;
  url: string;
  image: string;
  fbAppId: string;
  twitterUsername: string;
  jsonld: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService implements OnDestroy {
  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    private readonly router: Router,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  ngOnDestroy(): void {}

  addSeoData(): void {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        untilComponentDestroyed(this),
      )
      .subscribe((event: NavigationEnd) => {
        const root = this.router.routerState.snapshot.root;

        const {
          title,
          description,
          keywords,
          siteName,
          url,
          image,
          fbAppId,
          twitterUsername,
          jsonld,
        } = this.extractSeoData(root);

        this.setBaseTags();
        this.setTitle(title);
        this.setDescription(description);
        this.setKeywords(keywords);
        this.setSiteName(siteName);
        this.setUrl(url);
        this.setImage(image);
        this.setFbAppId(fbAppId);
        this.setTwitterUsername(twitterUsername);
      });
  }

  setBaseTags() {
    this.metaService.updateTag({
      name: 'referrer',
      content: 'no-referrer-when-downgrade',
    });
  }

  setDescription(desc: string) {
    if (!desc) {
      return;
    }

    this.metaService.updateTag({ property: 'og:description', content: desc });
    this.metaService.updateTag({ name: 'description', content: desc });
  }

  setKeywords(keys) {
    if (!keys) {
      return;
    }

    this.metaService.updateTag({ name: 'keywords', content: keys });
  }

  setUrl(src: string) {
    if (!src) {
      return;
    }

    this.metaService.updateTag({ property: 'og:url', content: src });
  }

  // Универсальные рекомендации для использования картинок: старайтесь,
  // чтобы размер картинок был не менее 1200 на 630 пикселей при соотношении
  // сторон 1.91:1, но при этом не забывайте про ограничение Twitter в 1Мб.
  setImage(src: string) {
    if (!src) {
      return;
    }

    this.metaService.updateTag({ property: 'og:image', content: src });
    this.metaService.updateTag({ name: 'twitter:card', content: src });
  }

  setTitle(title: string) {
    if (!title) {
      return;
    }

    this.titleService.setTitle(title);
    this.metaService.updateTag({ property: 'og:title', content: title });
  }

  setSiteName(name: string) {
    if (!name) {
      return;
    }

    this.metaService.updateTag({ name: 'og:site_name', content: name });
  }

  setFbAppId(appId: string) {
    if (!appId) {
      return;
    }

    this.metaService.updateTag({ property: 'fb:app_id', content: appId });
  }

  setTwitterUsername(name: string) {
    if (!name) {
      return;
    }

    this.metaService.updateTag({ name: 'twitter:site', content: name });
  }

  private extractSeoData(root: ActivatedRouteSnapshot): SeoData {
    let title: string;
    let description: string;
    let keywords: string;
    let siteName: string;
    let url: string;
    let image: string;
    let fbAppId: string;
    let twitterUsername: string;
    let jsonld: string;

    while (root) {
      if (root.data && Object.keys(root.data).length > 0) {
        title = root.data.title || title;
        description = root.data.description || description;
        keywords = root.data.keywords || keywords;
        siteName = root.data.siteName || siteName;
        url = root.data.url || url;
        image = root.data.image || image;
        fbAppId = root.data.fbAppId || fbAppId;
        twitterUsername = root.data.twitterUsername || twitterUsername;
        jsonld = root.data.jsonld || jsonld;
      }

      if (root.children && root.children.length) {
        root = root.children[0];
      } else {
        root = null;
      }
    }

    return {
      title,
      description,
      keywords,
      siteName,
      url,
      image,
      fbAppId,
      twitterUsername,
      jsonld,
    } as SeoData;
  }

  private loadScript(data) {
    const node = this.document.createElement('script');
    node.type = 'text/javascript';
    node.async = true;
    this.document.getElementsByTagName('head')[0].appendChild(node);
  }
}
