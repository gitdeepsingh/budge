import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  canActivate(): boolean {
      const isAuth = window.sessionStorage.getItem('LOGGEDIN') === 'OK';
    if (!isAuth) {
      this.router.navigate(['']);
      return false
    }
    return true;
  }
}