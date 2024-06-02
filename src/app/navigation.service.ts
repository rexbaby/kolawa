import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private bread$ = new BehaviorSubject<string>('');

  constructor() {}

  getBread() {
    return this.bread$.asObservable();
  }

  next(label: string) {
    this.bread$.next(label);
  }
}
