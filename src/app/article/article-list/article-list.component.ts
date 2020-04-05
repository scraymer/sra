import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@core/material/theme.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  cardImgSrc = '';

  private cardImgSrcDark = 'assets/under-construction-dark.jpg';
  private cardImgSrcLight = 'assets/under-construction-light.jpg';

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.isDark.subscribe(t => this.setCardImgSrc(t));
  }

  private setCardImgSrc(isDarkTheme: boolean): void {
    this.cardImgSrc = isDarkTheme ? this.cardImgSrcDark : this.cardImgSrcLight;
  }
}
