import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthGuard } from './config/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthGuard]
})
export class AppComponent implements OnInit {
  constructor(private _router: Router) {

  }
  title = 'budge';
  isAuthApp = false;
  isAuthorized = true;

  ngOnInit(): void {
    this._router.events.subscribe(event => {
      event instanceof NavigationEnd ?
        this.isAuthApp = event.url === '/' || event.url === '/register'
        : null;
    });
  }
}
