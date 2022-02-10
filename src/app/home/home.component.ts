import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/config/types';
import { ProfileService } from './../config/profile.service';
import { HttpService } from './../config/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HttpService, ProfileService],
})
export class HomeComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    // this.fetchUserProfile();
    this.profileService
    .getProfile()
    .subscribe({next: (v) => console.log(`Testing Async Subject B`, v)});
  }
  fetchUserProfile(): void {
    const payload = {
      email: 'deeptest4@test.com',
    };
    this.http
      .getProfile(payload)
      .subscribe({
        next: (res) => {
          console.log('res: ', res);
          this.profileService.setProfile(Object.assign({}, res));
        },
        error: (err) => {},
      })
      .add((e: void) => {});
  }
}
