import { Component, OnInit } from '@angular/core';
import { NavService } from '@core/layout/nav.service';
import { ThemeService } from '@core/material/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isDarkTheme: Observable<boolean>;

  constructor(private navService: NavService, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDark;
  }

  toggleDarkTheme(checked: boolean): void {
    this.themeService.setDark(checked);
  }

  toggleNav(): void {
    this.navService.toggle();
  }
}
