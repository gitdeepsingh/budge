import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
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
  @Output() isUserLoggedIn = new EventEmitter<any>(false);
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  email = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]);
  passphrase = new FormControl('', [Validators.required, Validators.minLength(6)]);

  public loginForm = this.fb.group({
    email: this.email,
    passphrase: this.passphrase
  });

  isLoading = false;

  ngOnInit(): void {
    this.isUserLoggedIn.emit(true);
  }

  onSubmit(): void {
    this.isLoading = true;
    this.http.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res) { // handle success
          this.isUserLoggedIn.emit(res);
          this.router.navigateByUrl('dashboard');
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
