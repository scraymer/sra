import { Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';

/**
 * Service used to control the application navigation state such as opening,
 * closing, and toggling the navigation drawer.
 */
@Injectable({
  providedIn: 'root'
})
export class NavService {

  /**
   * The material side nav component configured from the shared layout nav
   * component on initialization.
   */
  private nav: MatSidenav;

  /**
   * Set the material side nav component to manage.
   *
   * @param nav material sidenav component
   */
  setNav(nav: MatSidenav) {
    this.nav = nav;
  }

  /**
   * Open the navigation drawer.
   */
  open(): Promise<MatDrawerToggleResult> {
    return this.nav.open();
  }


  /**
   * Close the navigation drawer.
   */
  close(): Promise<MatDrawerToggleResult> {
    return this.nav.close();
  }

  /**
   * Toggle the navigation drawer open or close.
   */
  toggle(): Promise<MatDrawerToggleResult> {
    return this.nav.toggle();
  }
}
