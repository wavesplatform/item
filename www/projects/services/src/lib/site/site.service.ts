import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Site } from './site.model';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  constructor() {}

  get site(): Observable<Site> {
    return of(null);
  }
}
