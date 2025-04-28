import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboardrh',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './dashboardrh.component.html',
  styleUrl: './dashboardrh.component.css'
})
export class DashboardrhComponent {
  totalActiveOffers: number = 0; // à remplir depuis ton service
  applicationsThisMonth: number = 0; // à remplir depuis ton service
  pendingApplications: number = 0; // à remplir depuis ton service

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Accepté', 'En attente', 'Refusé'],
    datasets: [
      {
        data: [40, 30, 30], // Exemple : 40% accepté, 30% en attente, 30% refusé
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        hoverBackgroundColor: ['#059669', '#d97706', '#dc2626'],
      },
    ],
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#4B5563', // gris dark pour texte
          font: {
            size: 14,
          },
        },
      },
    },
  };
}
