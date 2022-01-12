import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from './../config/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpService]
})
@Injectable()
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private http: HttpService) { }

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  email = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]);
  passphrase = new FormControl('', [Validators.required, Validators.minLength(6)]);

  public loginForm = this.fb.group({
    email: this.email,
    passphrase: this.passphrase
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('===', this.loginForm.value)
    this.http.login(this.loginForm.value).subscribe((d) => console.log('ddd=>', d))
    // this.loginForm.reset();
  }

}
