import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';

import { NavService } from '@core/layout/nav.service';
import { ThemeService } from '@core/material/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {

  private cardImgSrcDark: string = 'assets/under-construction-dark.jpg';
  private cardImgSrcLight: string = 'assets/under-construction-light.jpg';

  cardImgSrc: string = '';

  isDarkTheme: Observable<boolean>;
  
  @ViewChild('sidenav')
  sidenav: MatSidenav;

  constructor(private navService: NavService, private themeService: ThemeService ) {};

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.themeService.isDarkTheme.subscribe(t => this.setCardImgSrc(t));
  }

  ngAfterViewInit(): void {
    this.navService.setNav(this.sidenav);
  }

  private setCardImgSrc(isDarkTheme: boolean): void {
    this.cardImgSrc = isDarkTheme ? this.cardImgSrcDark : this.cardImgSrcLight;
  }
}
