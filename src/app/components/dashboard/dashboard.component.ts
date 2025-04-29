import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartDataset } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { UserService } from '../../services/user.service';
import { ApplicationService } from '../../services/application.service';
import { JobofferService } from '../../services/joboffer.service';
import { CandidateService } from '../../services/candidate.service';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;
  totalCandidates = 0;
  totalOffers = 0;
  totalApplications = 0;
  applications: Application[] = [];
  isLoading = true;

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
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#3b82f6',
        pointHoverBorderColor: '#fff',
        pointHitRadius: 10,
        pointBorderWidth: 2
      }
    ],
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#6b7280',
          font: {
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#f9fafb',
        borderColor: '#374151',
        borderWidth: 1,
        displayColors: true,
        intersect: false,
        mode: 'index',
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.y + ' candidature(s)';
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280'
        }
      },
      y: { 
        beginAtZero: true,
        grid: {
          color: 'rgba(209, 213, 219, 0.3)'
        },
        ticks: {
          color: '#6b7280',
          stepSize: 1,
          precision: 0
        }
      },
    },
  };

  constructor(
    private userService: UserService,
    private CandidateService: CandidateService,
    private offerService: JobofferService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.isLoading = true;
    
    // Load all stats in parallel
    Promise.all([
      this.userService.getUsers().toPromise(),
      this.CandidateService.getCandidates().toPromise(),
      this.offerService.getJobOffer().toPromise(),
      this.applicationService.getApplications().toPromise()
    ]).then(([users, candidates, offers, apps]) => {
      this.totalUsers = users?.body?.length || 0;
      this.totalCandidates = candidates?.body?.length || 0;
      this.totalOffers = offers?.length || 0;
      this.totalApplications = apps?.length || 0;
      this.applications = apps || [];
      this.generateMonthlyData();
    }).catch(error => {
      console.error('Error loading dashboard data:', error);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  generateMonthlyData(): void {
    if (!this.applications || this.applications.length === 0) {
      console.warn('No applications data available');
      return;
    }

    const monthlyCounts: { [key: string]: number } = {};
    const now = new Date();
    const monthLabels = [];
    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

    // Create data for last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = date.getMonth();
      const year = date.getFullYear();
      const key = `${year}-${(month + 1).toString().padStart(2, '0')}`;
      
      monthlyCounts[key] = 0;
      monthLabels.push(`${monthNames[month]} ${year}`);
    }

    // Count applications per month
    this.applications.forEach(app => {
      try {
        const date = new Date(app.submissionDate);
        if (isNaN(date.getTime())) throw new Error('Invalid date');
        
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const key = `${year}-${month.toString().padStart(2, '0')}`;
        
        if (monthlyCounts[key] !== undefined) {
          monthlyCounts[key]++;
        }
      } catch (e) {
        console.error('Error processing application date:', app.submissionDate, e);
      }
    });

    // Update chart data
    this.lineChartData = {
      labels: monthLabels,
      datasets: [{
        ...this.lineChartData.datasets[0],
        data: Object.values(monthlyCounts)
      }]
    };
  }
}