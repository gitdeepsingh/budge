import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  firstName = new FormControl('', [Validators.required, Validators.minLength(3)]);
  lastName = new FormControl('');
  email = new FormControl('', [Validators.required]);
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
    console.log('===', this.registerForm.value)
    this.registerForm.reset();
  }

}
