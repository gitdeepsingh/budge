import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {

  constructor() { }
  highcharts = Highcharts;

  ngOnInit(): void {
  }

  chartOptions: Highcharts.Options = {
    chart: {
      plotBorderWidth: 2,
      plotShadow: true,
      type: 'pie'
    },
    title: {
      text: 'Your Expense Trends'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Expenses',
      colorByPoint: true,
      type: 'pie',
      data: [{
        name: 'Food',
        y: 58.00,
        sliced: true,
        selected: true
      }, {
        name: 'Misc. Bills',
        y: 11.84
      }, {
        name: 'Credit Card Bills',
        y: 10.85
      }, {
        name: 'Travelling',
        y: 4.67
      }, {
        name: 'Shopping',
        y: 4.18
      }, {
        name: 'Others',
        y: 3.41
      },
      {
        name: 'Fun Activities',
        y: 1.64
      }]
    }]
  }

}
