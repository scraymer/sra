import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { onAppInit as RedditServiceRun } from '@core/reddit/reddit.run';
import { RedditService } from '@core/reddit/reddit.service';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleModule } from './article/article.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    ArticleModule,
    AppRoutingModule
  ],
  providers: [
    RedditService,
    {
      provide: APP_INITIALIZER,
      useFactory: RedditServiceRun,
      deps: [RedditService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
