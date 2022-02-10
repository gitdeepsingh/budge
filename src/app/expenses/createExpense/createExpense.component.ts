import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroupDirective, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from './../../config/config.service';
import { UserProfile } from 'src/app/config/types';
import { ProfileService } from './../../config/profile.service';

@Component({
  selector: 'app-create-expense',
  templateUrl: './createExpense.component.html',
  styleUrls: ['./createExpense.component.css'],
  providers: [HttpService, ProfileService]
})
@Injectable()
export class CreateExpenseComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpService, private profileService: ProfileService) { }

  expenseType = new FormControl(null, [Validators.required]);
  expenseAmount = new FormControl(null, [Validators.required, Validators.min(1), Validators.max(999999999)]);
  expenseDesc = new FormControl(null, [Validators.maxLength(250)]);

  public expenseCreateForm = this.fb.group({
    expenseType: this.expenseType,
    expenseAmount: this.expenseAmount,
    expenseDesc: this.expenseDesc,
  });

  ngOnInit(): void {
    // this.profileService
    // .getProfile()
    // .subscribe((v: UserProfile) => console.log('CREATE vvv', v));
  }

  onSubmit(formDirective: FormGroupDirective) {
    console.log(' this.expenseCreateForm.value: ', this.expenseCreateForm.value);
    this.expenseCreateForm.reset(); // reset ugly validators
    formDirective.resetForm();
  }

  onReset(): void {
    this.expenseCreateForm.reset();
  }

}
