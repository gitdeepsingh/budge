import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from './../config/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpService]
})
@Injectable()
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private http: HttpService, private router: Router) { }
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  email = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]);
  passphrase = new FormControl('', [Validators.required, Validators.minLength(6)]);

  public loginForm = this.fb.group({
    email: this.email,
    passphrase: this.passphrase
  });

  isLoading = false;

  ngOnInit(): void { }

  fetchUserProfile(): void {
    const payload={
      userId: this.loginForm.value?.email
    }
    this.http.getProfile(payload).subscribe({
      next: (res) => {
        console.log('res: ', res);

      },
      error: (err) => {

      }
    }).add((e: void) => {

    })
  }

  onSubmit(): void {
    this.isLoading = true;
    this.http.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res) { // handle success
          window.sessionStorage.setItem('LOGGEDIN', 'OK')
          this.router.navigateByUrl('home');
          this.fetchUserProfile();
        } else {
          console.log('Not valid!'); // handle error
        }
      },
      error: (err) => { // handle errors
        console.log('err: ', err);
      },
    }).add((e: void) => { // finally
      this.isLoading = false;
    });
  }
}
