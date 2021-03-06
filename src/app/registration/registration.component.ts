import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from './../config/config.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [HttpService]
})
@Injectable()
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpService) { }

  isLoading = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  firstName = new FormControl('', [Validators.required, Validators.minLength(3)]);
  lastName = new FormControl('');
  email = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]);
  passphrase = new FormControl('', [Validators.required, Validators.minLength(6)]);

  public registerForm = this.fb.group({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    passphrase: this.passphrase
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isLoading = true;
    this.http.registerUser(this.registerForm.value).subscribe({
      next: (res) => {
        console.log('ddd=>', res)
      },
      error: (err) => { // handle errors
        console.log('err: ', err);
      },
    }).add((e: void) => { // finally
      this.isLoading = false;
    });
  }
}
