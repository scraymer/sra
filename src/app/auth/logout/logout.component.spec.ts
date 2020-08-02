import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RedditService } from '@core/reddit/reddit.service';
import { LogoutComponent } from './logout.component';


describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  let redditService: RedditService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterTestingModule
      ],
      declarations: [ LogoutComponent ]
    })
    .compileComponents();

    redditService = TestBed.inject(RedditService);
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: fix unit test dependency mocking
  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
