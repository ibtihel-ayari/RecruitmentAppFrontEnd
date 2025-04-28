import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboardcandidate',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './dashboardcandidate.component.html',
  styleUrl: './dashboardcandidate.component.css'
})
export class DashboardcandidateComponent {
  totalApplicationsSent: number = 0; // à remplir avec ton service
  ongoingApplications: number = 0; // idem
  averageQuizScore: number = 0; // idem

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Envoyé', 'En attente', 'Accepté', 'Refusé'],
    datasets: [
      {
        label: 'Nombre de candidatures',
        data: [12, 7, 5, 2], // exemple de données
        backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'],
      },
    ],
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: '#6b7280' },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#6b7280' },
        grid: { color: '#e5e7eb' },
      },
    },
  };

  applicationProcessSteps = [
    { title: 'Création du compte', description: 'Inscription et accès à votre espace personnel.' },
    { title: 'Soumission de candidature', description: 'Postulez aux offres en déposant votre dossier.' },
    { title: 'Pré-sélection par IA', description: 'Votre profil est analysé pour une première sélection.' },
    { title: 'Passage du quiz', description: 'Testez vos compétences via un quiz personnalisé.' },
    { title: 'Entretiens RH et Technique', description: 'Rencontrez nos équipes pour valider votre candidature.' },
    { title: 'Décision finale', description: 'Réception de la réponse concernant votre candidature.' }
  ];
  
}