import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroupDirective, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../config/config.service';
import { UserProfile, Expense } from 'src/app/config/types';
import { ProfileService } from '../../config/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-expense',
  templateUrl: './manageExpense.component.html',
  styleUrls: ['./manageExpense.component.css'],
  providers: [HttpService, ProfileService, ToastrService]
})
@Injectable()
export class ManageExpenseComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpService, private profileService: ProfileService, private toaster: ToastrService) { }

  expenseType = new FormControl(null, [Validators.required]);
  expenseAmount = new FormControl(null, [Validators.required, Validators.min(1), Validators.max(999999999)]);
  expenseDesc = new FormControl(null, [Validators.maxLength(250)]);

  public expenseCreateForm = this.fb.group({
    expenseType: this.expenseType,
    expenseAmount: this.expenseAmount,
    expenseDesc: this.expenseDesc,
  });
  public tooltipMeta = {
    enable: false,
    text: ""
  }

  ngOnInit(): void {
    this.profileService
    .getProfile()
    .subscribe({next: (v) => console.log(`vvvvv deep`, v)});
  }

  onSubmit(formDirective: FormGroupDirective) {
    const userId = window.sessionStorage.getItem("userId");
    const body: Expense = {  userId , details: this.expenseCreateForm.value }
    this.http.createExpense(body).subscribe({
      next: (res) => {
        this.toaster.success('Successfully created your expense!');
      },
      error: (err) => { // handle errors
        this.toaster.error('Failed to create your expense. Pease try again later!');
      },
    }).add(() => {
      this.expenseCreateForm.reset(); // reset ugly validators
      formDirective.resetForm();
    })

  }

  onReset(): void {
    this.expenseCreateForm.reset();
  }

}
