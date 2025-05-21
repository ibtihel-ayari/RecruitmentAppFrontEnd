import { Component, OnInit } from '@angular/core';
import { ApplicationAnalysis } from '../../models/applicationanalysis.model';
import { AnalysisService } from '../../services/analysis.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-applicationtop',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './applicationtop.component.html',
  styleUrl: './applicationtop.component.css'
})
export class ApplicationtopComponent implements OnInit {
 jobOfferId: number = 1; 
  topCount: number = 5; 
  applications: ApplicationAnalysis[] = [];
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private analysisService: AnalysisService,
    private applicationService: ApplicationService,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const jobOfferIdFromUrl = this.route.snapshot.paramMap.get('id');
    if (jobOfferIdFromUrl) {
      this.jobOfferId = Number(jobOfferIdFromUrl);
    }
    this.getTopApplications();
  }

  getTopApplications(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.analysisService.analyzeApplications(this.jobOfferId).subscribe({
      next: (response) => {
        if (response.success) {
          this.analysisService.getTopApplications(this.jobOfferId, this.topCount).subscribe({
            next: (data) => {
              this.applications = data;
              this.isLoading = false;
            },
            error: (err) => {
              console.error('Erreur lors du chargement des candidatures :', err);
              this.errorMessage = "Erreur lors du chargement des candidatures.";
              this.isLoading = false;
            }
          });
        } else {
          this.errorMessage = "Échec de l'analyse des candidatures.";
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Erreur lors de l\'analyse des candidatures :', err);
        this.errorMessage = "Erreur lors de l'analyse des candidatures.";
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/joboffer']); 
  }

  validateApplication(application: ApplicationAnalysis): void {
    const updatedApp = { isValidated: true };
  
    this.applicationService.updateApplicationValidation(application.id, updatedApp)
      .subscribe({
        next: () => {
          application.isValidated = true;
          this.successMessage = 'Candidature Pré-sélectionnée avec succès !';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          console.error('Erreur lors de la Pré-sélection :', err);
        }
      });
  }

  sendQuizToCandidate(application: ApplicationAnalysis): void {
    if (application.isSendingQuiz) return;
    
    application.isSendingQuiz = true;
    this.errorMessage = null;
    this.successMessage = null;

    // Si un quiz est déjà affecté, on l'envoie directement
    if (application.quizId) {
      this.sendQuizEmail(application);
      return;
    }

    // Sinon, on affecte d'abord un quiz aléatoire
    this.quizService.getQuizzesByJobOfferId(this.jobOfferId).subscribe({
      next: (quizzes) => {
        if (!quizzes || quizzes.length === 0) {
          this.errorMessage = "Aucun quiz disponible pour cette offre.";
          application.isSendingQuiz = false;
          return;
        }

        const randomIndex = Math.floor(Math.random() * quizzes.length);
        const selectedQuiz = quizzes[randomIndex];

        this.quizService.updateQuiz({
          id: selectedQuiz.id,
          applicationId: application.id,
          jobOfferId: this.jobOfferId
        }).subscribe({
          next: () => {
            application.quizId = selectedQuiz.id;
            this.sendQuizEmail(application);
          },
          error: (error) => {
            console.error('Erreur lors de l\'affectation du quiz :', error);
            this.errorMessage = "Erreur lors de l'affectation du quiz";
            application.isSendingQuiz = false;
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des quizzes :', error);
        this.errorMessage = "Erreur lors de la récupération des quizzes";
        application.isSendingQuiz = false;
      }
    });
  }

  private sendQuizEmail(application: ApplicationAnalysis): void {
    if (!application.candidateEmail) {
      this.errorMessage = "Email du candidat manquant.";
      application.isSendingQuiz = false;
      return;
    }

    const request = {
      candidateEmail: application.candidateEmail,
      candidateName: application.candidateName
    };

    this.quizService.sendQuizToCandidate(application.quizId!, request).subscribe({
      next: () => {
        this.successMessage = `Quiz envoyé à ${application.candidateName}`;
        setTimeout(() => this.successMessage = null, 3000);
        application.isSendingQuiz = false;
      },
      error: (error) => {
        console.error("Erreur lors de l'envoi de l'email :", error);
        this.errorMessage = "Erreur lors de l'envoi de l'email. Veuillez réessayer.";
        application.isSendingQuiz = false;
      }
    });
  }
}