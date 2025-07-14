import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-dashboardcandidate',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './dashboardcandidate.component.html',
  styleUrl: './dashboardcandidate.component.css'
})
export class DashboardcandidateComponent implements OnInit {
  totalApplications: number = 0;
  ongoingApplications: number = 0;
  averageQuizScore: number = 71;
  candidateData: any;
  applications: Application[] = [];
  currentCandidateId: number | null = null;

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['En cours', 'Accepté', 'Refusé'],
    datasets: [
      {
        label: 'Nombre de candidatures',
        data: [0, 0, 0],
        backgroundColor: ['rgba(165, 180, 252, 0.5)', 
          'rgba(216, 180, 254, 0.5)', 
          'rgba(251, 207, 232, 0.5)',  ], 
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
    { title: 'Pré-sélection', description: 'Votre profil est analysé pour une première sélection.' },
    { title: 'Passage du quiz', description: 'Testez vos compétences via un quiz personnalisé.' },
    { title: 'Validation finale', description: 'Réception de la réponse concernant votre candidature.' }
  ];

  constructor(private applicationService: ApplicationService,  private quizService: QuizService
) {}

  ngOnInit(): void {
    this.loadCandidateData();
    this.loadApplications();
      this.loadApplications(); // Ne pas appeler loadQuizzesAndScores ici, car les applications ne sont pas encore chargées

  }

  private loadCandidateData(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.candidateData = JSON.parse(userData);
      this.currentCandidateId = this.candidateData.id;
      console.log('Candidate data loaded:', this.candidateData);
    }
  }

  private loadApplications(): void {
    this.applicationService.getApplications().subscribe({
      next: (response) => {
        const allApplications = response as Application[];
        
        // Filtrer pour n'avoir que celles du candidat connecté
        if (this.currentCandidateId !== null) {
          this.applications = allApplications.filter(app => app.candidateId === this.currentCandidateId);
        } else {
          this.applications = [];
        }

        console.log('Applications loaded:', this.applications);
        this.calculateStats();
      },
      error: (error) => {
        console.error('Error loading applications', error);
        // Optionnel: charger depuis le localStorage en cas d'erreur
        const storedApplications = localStorage.getItem('candidateApplications');
        if (storedApplications) {
          this.applications = JSON.parse(storedApplications);
          this.calculateStats();
          this.loadQuizzesAndScores(); // après que les applications soient chargées

        }
      }
    });
  }

  private calculateStats(): void {
    this.totalApplications = this.applications.length;
    
    // Compter les applications en cours (statut 'pending' ou autre selon votre modèle)
    this.ongoingApplications = this.applications.filter(app => 
      app.status === 'En attente' || app.status === 'En attente'
    ).length;
    
    // Calcul du score moyen aux quiz
    /*const quizScores = this.applications
      .filter(app => app.similarityScore !== undefined && app.similarityScore !== null)
      .map(app => app.similarityScore);
      
    this.averageQuizScore = quizScores.length > 0 
      ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
      : 0;*/

    this.updateChartData();
  }

  private updateChartData(): void {
    // Compter les applications par statut
    const counts = {
      pending: this.applications.filter(app => 
        app.status === 'En attente' || app.status === 'En attente'
      ).length,
      accepted: this.applications.filter(app => 
        app.status === 'Accepté' || app.status === 'accepted'
      ).length,
      rejected: this.applications.filter(app => 
        app.status === 'Refusé' || app.status === 'rejected'
      ).length
    };

    this.barChartData = {
      ...this.barChartData,
      datasets: [
        {
          ...this.barChartData.datasets[0],
          data: [counts.pending, counts.accepted, counts.rejected]
        }
      ]
    };
  }
  private loadQuizzesAndScores(): void {
  if (this.applications.length === 0) {
    this.averageQuizScore = 0;
    return;

  }

  const applicationIds = this.applications.map(app => app.id);

  this.quizService.getQuizzes().subscribe({
    next: (quizzes) => {
      // Filtrer les quiz appartenant à ce candidat
      const candidateQuizzes = quizzes.filter(q => applicationIds.includes(q.applicationId));
      
      // Extraire tous les scores
      const allScores: number[] = [];

      candidateQuizzes.forEach(quiz => {
        if (quiz.responses && quiz.responses.length > 0) {
          quiz.responses.forEach(res => {
            if (res.score !== undefined && res.score !== null) {
              allScores.push(res.score);
            }
          });
        }
      });

      // Calculer la moyenne
      this.averageQuizScore = allScores.length > 0
        ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
        : 0;

      console.log('Moyenne quiz du candidat:', this.averageQuizScore);
    },
    error: (err) => {
      console.error('Erreur lors de la récupération des quiz:', err);
    }
  });
}

}