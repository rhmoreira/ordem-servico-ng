import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private visibilitySubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  public setVisible(visible: boolean): void {
    this.visibilitySubject.next(visible);
  }

  public getVisibility(): Observable<boolean> {
    return this.visibilitySubject;
  }
}
