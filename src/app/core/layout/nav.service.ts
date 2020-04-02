import { Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private nav: MatSidenav;

  public setNav(nav: MatSidenav) {
    this.nav = nav;
  }

  public open(): Promise<MatDrawerToggleResult> {
    return this.nav.open();
  }


  public close(): Promise<MatDrawerToggleResult> {
    return this.nav.close();
  }

  public toggle(): Promise<MatDrawerToggleResult> {
    return this.nav.toggle();
  }
}
