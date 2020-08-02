import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RedditService } from '@core/reddit/reddit.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private redditService: RedditService, private router: Router) { }

  ngOnInit(): void {
    this.logout();
  }

  /**
   * Revoke existing session and re-authenticate as a new "user-less" session.
   * Once complete, navigate to the application root.
   */
  private logout(): void {
    this.redditService.revoke()
      .then((r) => this.router.navigateByUrl('/'));
  }
}
