import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentType } from './content.model';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  requestToGetContent: Observable<ContentType> = null;

  constructor() {}

  // get content(): Observable<ContentType> {}
  //
  // getContent(): Observable<ContentType> {}
}
