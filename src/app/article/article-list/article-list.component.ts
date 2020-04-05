import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@core/material/theme.service';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { ArticleListConstent } from './article-list.constent';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

    articles: Article[];
    constructionImage: string;

    constructor(private articleService: ArticleService, private themeService: ThemeService) { }

    ngOnInit(): void {
        this.getArticles();
        this.getConstructionImage();
    }

    private getArticles(): void {
        this.articleService.getArticles()
            .subscribe(articles => this.setArticles(articles));
    }

    private getConstructionImage(): void {
        this.themeService.isDark
            .subscribe(t => this.setConstructionImage(t));
    }

    private setArticles(articles: Article[]): void {
        this.articles = articles;
    }

    private setConstructionImage(isDarkTheme: boolean): void {
        this.constructionImage = isDarkTheme
            ? ArticleListConstent.IMG_CONSTRUCTION.DARK
            : ArticleListConstent.IMG_CONSTRUCTION.LIGHT;
    }
}
