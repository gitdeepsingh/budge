import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { UserProfile } from 'src/app/config/types';
import { ProfileService } from './../../config/profile.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css'],
  providers: [ProfileService],
})
export class TrendsComponent implements OnInit {
  constructor(private profileService: ProfileService) {}
  highcharts = Highcharts;
  data: any = {};

  ngOnInit(): void {
    this.profileService
      .getProfile()
      .subscribe({next: (v) => console.log(`Testing Async Subject A:`, v)});
  }

  chartOptions: Highcharts.Options = {
    chart: {
      plotBorderWidth: 2,
      plotShadow: true,
      type: 'pie',
    },
    title: {
      text: 'Your Expense Trends',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Expenses',
        colorByPoint: true,
        type: 'pie',
        data: [
          {
            name: 'Food',
            y: 58.0,
            sliced: true,
            selected: true,
          },
          {
            name: 'Misc. Bills',
            y: 11.84,
          },
          {
            name: 'Credit Card Bills',
            y: 10.85,
          },
          {
            name: 'Travelling',
            y: 4.67,
          },
          {
            name: 'Shopping',
            y: 4.18,
          },
          {
            name: 'Others',
            y: 3.41,
          },
          {
            name: 'Fun Activities',
            y: 1.64,
          },
        ],
      },
    ],
  };
}
