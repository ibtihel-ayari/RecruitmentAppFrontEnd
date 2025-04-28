import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { UserService } from '../../services/user.service';
import { ApplicationService } from '../../services/application.service';
import { JobofferService } from '../../services/joboffer.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;
  totalOffers = 0;
  totalApplications = 0;

  // Chart data
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Candidatures par mois',
        fill: true,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        tension: 0.4,
      }
    ],
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {},
      y: { beginAtZero: true },
    },
  };

  constructor(
    private userService: UserService,
    private offerService: JobofferService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  //  this.loadChartData();
  }

  loadStats() {
    this.userService.getUsers().subscribe(users => {
      this.totalUsers = users.length;
    });

    this.offerService.getJobOffer().subscribe(offers => {
      this.totalOffers = offers.length;
    });

    this.applicationService.getApplications().subscribe(apps => {
      this.totalApplications = apps.length;
    });
  }

 /* loadChartData() {
    this.applicationService.getApplicationsByMonth().subscribe(data => {
      this.lineChartData.labels = data.map((item: any) => item.month);
      this.lineChartData.datasets[0].data = data.map((item: any) => item.count);
    });
  }*/
}