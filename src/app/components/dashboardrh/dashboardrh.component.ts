import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { JobofferService } from '../../services/joboffer.service';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-dashboardrh',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './dashboardrh.component.html',
  styleUrl: './dashboardrh.component.css'
})
  export class DashboardrhComponent implements OnInit {
    totalActiveOffers: number = 0;
    applicationsThisMonth: number = 0;
    pendingApplications: number = 0;
    isLoading = true;
  
    pieChartData: ChartConfiguration<'pie'>['data'] = {
      labels: ['Accepté', 'En attente', 'Refusé'],
      datasets: [
        {
          data: [0, 0, 0],
          backgroundColor: [ 'rgba(74, 222, 128, 0.6)', 
            'rgba(250, 204, 85, 0.6)',  
            'rgba(248, 113, 113, 0.6)' ],         // Vert pastel, Jaune pastel, Rouge pastel
          hoverBackgroundColor: ['#22c55e', '#eab308', '#ef4444'],    // Survol : tons plus profonds
          borderColor: ['#ffffff', '#ffffff', '#ffffff'],             // Bord blanc pour contraste
          borderWidth: 2,
        },
      ],
    };
  
    pieChartOptions: ChartConfiguration<'pie'>['options'] = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#374151', // text-gray-700
            font: {
              size: 14,
              weight: 'bold'
            },
            padding: 16,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: '#f9fafb',
          titleColor: '#111827',
          bodyColor: '#1f2937',
          borderColor: '#e5e7eb',
          borderWidth: 1,
          padding: 10,
        }
      },
    };
  
  
    constructor(
      private offerService: JobofferService,
      private applicationService: ApplicationService
    ) {}
  
    ngOnInit(): void {
      this.loadStats();
    }
  
    loadStats() {
      this.isLoading = true;
      
      // Chargement des données en parallèle
      Promise.all([
        this.loadActiveOffers(),
        this.loadApplicationsData(),
        this.loadApplicationsThisMonth()
      ]).catch(error => {
        console.error('Error loading RH dashboard data:', error);
      }).finally(() => {
        this.isLoading = false;
      });
    }
  
    private loadActiveOffers(): Promise<void> {
      return this.offerService.getJobOffer().toPromise()
        .then(offers => {
          if (offers) {
            // Compte simplement toutes les offres disponibles
            this.totalActiveOffers = offers.length;
          }
        })
        .catch(error => {
          console.error('Error loading job offers:', error);
          throw error; // Important pour la gestion des erreurs dans Promise.all
        });
    }
  
    private loadApplicationsData(): Promise<void> {
      return this.applicationService.getApplications().toPromise()
        .then(applications => {
          if (applications) {
            // Calculer les statuts des candidatures pour le graphique
            const accepted = applications.filter(app => app.status === 'Accepté').length;
            const pending = applications.filter(app => app.status === 'En attente').length;
            const rejected = applications.filter(app => app.status === 'Refusé').length;
            
            this.pendingApplications = pending;
            
            // Mettre à jour le graphique
            this.pieChartData = {
              ...this.pieChartData,
              datasets: [{
                ...this.pieChartData.datasets[0],
                data: [accepted, pending, rejected]
              }]
            };
          }
        });
    }
  
    private loadApplicationsThisMonth(): Promise<void> {
      return this.applicationService.getApplications().toPromise()
        .then(applications => {
          if (applications) {
            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();
            
            this.applicationsThisMonth = applications.filter(app => {
              try {
                const appDate = new Date(app.submissionDate);
                return appDate.getMonth() === currentMonth && 
                       appDate.getFullYear() === currentYear;
              } catch (e) {
                console.error('Invalid application date:', app.submissionDate);
                return false;
              }
            }).length;
          }
        });
    }
  }