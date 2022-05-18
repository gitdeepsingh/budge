import { Component, OnInit, Injectable } from '@angular/core';
import {
  FormGroupDirective,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../config/config.service';
import { UserProfile, Expense } from 'src/app/config/types';
import { ProfileService } from '../../config/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-expense',
  templateUrl: './manageExpense.component.html',
  styleUrls: ['./manageExpense.component.css'],
  providers: [HttpService, ProfileService, ToastrService],
})
@Injectable()
export class ManageExpenseComponent implements OnInit {
  constructor(
    private http: HttpService,
    private profileService: ProfileService,
    private toaster: ToastrService
  ) {}
  public list: any;
  ngOnInit(): void {
    this.http
      .getExpenses(window.sessionStorage.getItem('userId'))
      .subscribe({
        next: (v) => this.list = v?.data
      });
  }
}
