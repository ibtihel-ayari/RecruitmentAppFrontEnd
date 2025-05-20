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
 isAssigningQuiz = false;
  errorMessage: string | null = null;

  constructor(
    private analysisService: AnalysisService,
    private applicationService:ApplicationService,
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
    this.analysisService.getTopApplications(this.jobOfferId, this.topCount).subscribe({
      next: (data) => {
        this.applications = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  analyzeApplications(): void {
    this.analysisService.analyzeApplications(this.jobOfferId).subscribe({
      next: (response) => {
        if (response.success) {
          this.getTopApplications();
        }
      },
      error: (err) => console.error(err)
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
          this.successMessage = 'Candidature validée avec succès !';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          console.error('Erreur lors de la validation :', err);
        }
      });
  }

 assignRandomQuiz(application: ApplicationAnalysis): void {
  if (application.isAssigningQuiz || application.isValidated) return;

  application.isAssigningQuiz = true;
  this.errorMessage = null;
  this.successMessage = null;

  this.quizService.getQuizzesByJobOfferId(this.jobOfferId).subscribe({
    next: (quizzes) => {
      if (!quizzes || quizzes.length === 0) {
        this.errorMessage = "Aucun quiz disponible pour cette offre.";
        application.isAssigningQuiz = false;
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
          this.successMessage = `Quiz affecté avec succès à ${application.candidateName}`;
          setTimeout(() => this.successMessage = null, 3000);
          application.isAssigningQuiz = false;
          application.quizId = selectedQuiz.id;

          // this.getTopApplications(); // Optionnel selon vos besoins
        },
        error: (error) => {
          console.error('Erreur lors de l\'affectation du quiz :', error);
          this.errorMessage = "Erreur lors de l'affectation du quiz";
          application.isAssigningQuiz = false;
        }
      });
    },
    error: (error) => {
      console.error('Erreur lors de la récupération des quizzes :', error);
      this.errorMessage = "Erreur lors de la récupération des quizzes";
      application.isAssigningQuiz = false;
    }
  });
}


//send email to candidate 
sendQuiz(app: ApplicationAnalysis): void {
  console.log('Envoi email à', app);

  if (!app.candidateEmail) {
    this.errorMessage = "Email du candidat manquant.";
    return;
  }

  if (!app.quizId) {
    this.errorMessage = "Aucun quiz n'a été affecté à ce candidat.";
    return;
  }

  const request = {
    candidateEmail: app.candidateEmail,
    candidateName: app.candidateName
  };

  this.quizService.sendQuizToCandidate(app.quizId, request).subscribe({
    next: () => {
      this.successMessage = `Email envoyé à ${app.candidateName}`;
      setTimeout(() => this.successMessage = null, 3000);
    },
    error: (error) => {
      console.error("Erreur lors de l'envoi de l'email :", error);
      this.errorMessage = "Erreur lors de l'envoi de l'email. Veuillez réessayer.";
    }
  });
}




}