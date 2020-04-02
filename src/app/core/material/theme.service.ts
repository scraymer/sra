import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _darkThemeSource: Subject<boolean> = new BehaviorSubject<boolean>(false);

  isDarkTheme = this._darkThemeSource.asObservable();

  setDarkTheme(isDarkTheme: boolean): void {
    this._darkThemeSource.next(isDarkTheme);
  }
}
