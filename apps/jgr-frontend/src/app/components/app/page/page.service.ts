import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  public readonly searchValue$ = new BehaviorSubject<string>('');
  public readonly searchSubmit$ = new Subject<string>();
}
