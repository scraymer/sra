import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleConstant } from '@core/layout/title.constant';
import { ArticleListComponent } from './article-list/article-list.component';

const routes: Routes = [
    { path: 'front-page', component: ArticleListComponent, data: { title: TitleConstant.NO_ROUTE_TITLE } },
    { path: 'front-page/:sort', component: ArticleListComponent, data: { title: TitleConstant.NO_ROUTE_TITLE } },
    { path: 'front-page/:sort/:page/after/:after', component: ArticleListComponent, data: { title: TitleConstant.NO_ROUTE_TITLE } },
    { path: 'front-page/:sort/:page/before/:before', component: ArticleListComponent, data: { title: TitleConstant.NO_ROUTE_TITLE } },

    { path: 'r/:subreddit', component: ArticleListComponent, data: { title: TitleConstant.NO_ROUTE_TITLE } },
    { path: 'r/:subreddit/:sort', component: ArticleListComponent, data: { title: TitleConstant.NO_ROUTE_TITLE } },
    { path: 'r/:subreddit/:sort/:page/after/:after', component: ArticleListComponent, data: { title: TitleConstant.NO_ROUTE_TITLE } },
    { path: 'r/:subreddit/:sort/:page/before/:before', component: ArticleListComponent, data: { title: TitleConstant.NO_ROUTE_TITLE } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule { }
