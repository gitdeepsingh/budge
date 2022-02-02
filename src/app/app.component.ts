import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _router: Router) {

  }
  title = 'budge';
  isAuthApp = false;

  ngOnInit(): void {
    this._router.events.subscribe(event => {
      event instanceof NavigationEnd ? 
      this.isAuthApp = event.url === '/' || event.url === '/register'
      : null 
    });
  }
}
