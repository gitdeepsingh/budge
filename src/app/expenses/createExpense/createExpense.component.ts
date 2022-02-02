import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from './../../config/config.service';

@Component({
  selector: 'app-create-expense',
  templateUrl: './createExpense.component.html',
  styleUrls: ['./createExpense.component.css'],
  providers: [HttpService]
})
@Injectable()
export class CreateExpenseComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpService) { }

  expenseType = new FormControl(null, [Validators.required]);
  expenseAmount = new FormControl(null, [Validators.required, Validators.min(1), Validators.max(999999999)]);
  expenseDesc = new FormControl(null, [Validators.maxLength(250)]);

  public expenseCreateForm = this.fb.group({
    expenseType: this.expenseType,
    expenseAmount: this.expenseAmount,
    expenseDesc: this.expenseDesc,
  });

  ngOnInit(): void {
  }

  onSubmit():void {
    console.log(' this.expenseCreateForm.value: ',  this.expenseCreateForm.value);
    this.expenseCreateForm.reset();
  }

  onReset():void {
    this.expenseCreateForm.reset();
  }

}
