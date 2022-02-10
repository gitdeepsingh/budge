import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '../config/types';
import { HttpService } from './../config/config.service';
import { ProfileService } from './../config/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpService, ProfileService],
})
@Injectable()
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private profileService: ProfileService
  ) {}

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  email = new FormControl('', [
    Validators.required,
    Validators.pattern(this.emailPattern),
  ]);
  passphrase = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  public loginForm = this.fb.group({
    email: this.email,
    passphrase: this.passphrase,
  });

  isLoading = false;

  ngOnInit(): void {}

  fetchUserProfile(): void {
    const payload:Profile = {
      email: this.loginForm.value?.email,
    };
    this.http
      .getProfile(payload)
      .subscribe({
        next: (res) => {
          console.log('res: ', res);
          this.profileService.setProfile(res);
          window.sessionStorage.setItem('LOGGEDIN', 'OK');
          this.router.navigateByUrl('home');
        },
        error: (err) => {},
      })
      .add((e: void) => {});
  }

  onSubmit(): void {
    this.isLoading = true;
    this.http
      .login(this.loginForm.value)
      .subscribe({
        next: (res) => {
          if (res) {
            // handle success
            this.fetchUserProfile();
          } else {
            console.log('Not valid!'); // handle error
          }
        },
        error: (err) => {
          // handle errors
          console.log('err: ', err);
        },
      })
      .add((e: void) => {
        // finally
        this.isLoading = false;
      });
  }
}
