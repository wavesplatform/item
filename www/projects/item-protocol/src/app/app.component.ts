import { Component } from '@angular/core';
import { SeoService } from '@libs/seo/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly seoService: SeoService) {
    this.seoService.addSeoData();
  }
}
