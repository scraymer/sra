import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleRoutingModule } from './article-routing.module';

@NgModule({
  declarations: [ArticleListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
