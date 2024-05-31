import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NevigationService {
  breadSubject = new Subject<any>();
  bread$ = this.breadSubject.asObservable();
  addBread(params: any) {
    this.breadSubject.next(params);
  }
}
