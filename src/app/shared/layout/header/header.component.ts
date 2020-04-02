import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { NavService } from '@core/layout/nav.service';
import { ThemeService } from '@core/material/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isDarkTheme: Observable<boolean>;

  constructor(private navService: NavService, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean): void {
    this.themeService.setDarkTheme(checked);
  }

  toggleNav(): void {
    this.navService.toggle();
  }
}
