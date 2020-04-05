import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@core/material/theme.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  constructionImgSrc = '';

  private constructionImgSrcDark = 'assets/under-construction-dark.jpg';
  private constructionImgSrcLight = 'assets/under-construction-light.jpg';

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.isDark.subscribe(t => this.setConstructionImgSrc(t));
  }

  private setConstructionImgSrc(isDarkTheme: boolean): void {
    this.constructionImgSrc = isDarkTheme ? this.constructionImgSrcDark : this.constructionImgSrcLight;
  }
}
