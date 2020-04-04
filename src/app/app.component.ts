import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavService } from '@core/layout/nav.service';
import { ThemeService } from '@core/material/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {

  private cardImgSrcDark = 'assets/under-construction-dark.jpg';
  private cardImgSrcLight = 'assets/under-construction-light.jpg';

  cardImgSrc = '';

  isDarkTheme: Observable<boolean>;

  @ViewChild('sidenav')
  sidenav: MatSidenav;

  constructor(private navService: NavService, private themeService: ThemeService ) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDark;
    this.themeService.isDark.subscribe(t => this.setCardImgSrc(t));
  }

  ngAfterViewInit(): void {
    this.navService.setNav(this.sidenav);
  }

  private setCardImgSrc(isDarkTheme: boolean): void {
    this.cardImgSrc = isDarkTheme ? this.cardImgSrcDark : this.cardImgSrcLight;
  }
}
