import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {
  public constructor(public auth: AuthenticationService, public router: Router) {}

  public ngOnInit(): void {}

  public handleLogout(): void {
    this.auth.logout();
  }

  public isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  public openUserProfile(): void {
    this.auth.getProfileById(this.auth.getUserId()).subscribe((response) => {
      this.router.navigate(['/profile/', response.user.name]);
    })
  }
}
