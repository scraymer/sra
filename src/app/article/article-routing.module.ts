import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';

const routes: Routes = [
    { path: 'front-page', component: ArticleListComponent},
    { path: 'front-page/:sort', component: ArticleListComponent},
    { path: 'front-page/:sort/:page/after/:after', component: ArticleListComponent},
    { path: 'front-page/:sort/:page/before/:before', component: ArticleListComponent},

    { path: 'r/:subreddit', component: ArticleListComponent },
    { path: 'r/:subreddit/:sort', component: ArticleListComponent },
    { path: 'r/:subreddit/:sort/:page/after/:after', component: ArticleListComponent },
    { path: 'r/:subreddit/:sort/:page/before/:before', component: ArticleListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule { }
