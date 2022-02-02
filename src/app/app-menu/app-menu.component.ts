import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {

  constructor(private _router: Router) { }
  ngOnInit(): void { }

  logoutUser(): void {
    window.sessionStorage.clear();
    this._router.navigateByUrl('/');
  }

}
