import { Component, OnInit } from '@angular/core';
import { JobOffer } from '../../models/job-offer.model';
import { JobofferService } from '../../services/joboffer.service';
import { QuizService } from '../../services/quiz.service';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { CommonModule } from '@angular/common';
import { Candidate } from '../../models/candidate.models';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-finalvalidation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finalvalidation.component.html',
  styleUrl: './finalvalidation.component.css'
})
export class FinalvalidationComponent implements OnInit {
    jobOffers: JobOffer[] = [];
  allApplications: Application[] = [];
  scoresByJobOffer: { [key: number]: any[] } = {};
  isLoading = false;
  errorMessage = '';
  candidates: Candidate[] = [];

  
  constructor(
    private jobOfferService: JobofferService,
    private quizService: QuizService,
    private applicationService: ApplicationService,  private candidateService: CandidateService

  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = '';
this.candidateService.getCandidates().subscribe({
  next: (response) => {
    this.candidates = response.body; // assure-toi que response.body contient bien la liste
  },
  error: (err) => {
    console.error('Erreur lors du chargement des candidats', err);
  }
});

    this.jobOfferService.getJobOffer().subscribe({
      next: (offers) => {
        this.jobOffers = offers;
        
        this.applicationService.getApplications().subscribe({
          next: (applications) => {
            this.allApplications = applications;
            
            const scorePromises = this.jobOffers.map(offer => 
              this.loadScoresForOffer(offer.id)
            );
            
            Promise.all(scorePromises).then(() => {
              this.isLoading = false;
            });
          },
          error: (err) => {
            this.errorMessage = 'Erreur lors du chargement des candidatures';
            this.isLoading = false;
            console.error(err);
          }
        });
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des offres d\'emploi';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  getApplicationsForOffer(jobOfferId: number): Application[] {
    return this.allApplications.filter(app => app.jobOfferId === jobOfferId && app.isValidated);
  }

  loadScoresForOffer(jobOfferId: number): Promise<void> {
    return new Promise((resolve) => {
      this.quizService.getScoresByJobOfferId(jobOfferId).subscribe({
        next: (scores) => {
          this.scoresByJobOffer[jobOfferId] = scores || [];
          resolve();
        },
        error: (err) => {
          console.warn(`Aucun score trouvé pour l'offre ${jobOfferId}`);
          this.scoresByJobOffer[jobOfferId] = [];
          resolve();
        }
      });
    });
  }

getCandidateName(applicationId: number, jobOfferId: number): string {
  const application = this.allApplications.find(app => app.id === applicationId);
  if (!application) return 'N/A';

  const candidate = this.candidates.find(c => c.id === application.candidateId);
  if (!candidate) return 'N/A';

  return `${candidate.firstName} ${candidate.lastName}`;
}


  getCandidateScore(applicationId: number, jobOfferId: number): number {
    if (!this.scoresByJobOffer[jobOfferId]) return 0;
    const scoreInfo = this.scoresByJobOffer[jobOfferId].find(s => s.applicationId === applicationId);
    return scoreInfo?.score || 0;
  }

  updateStatus(application: Application, newStatus: string): void {
  // Vérifier si le statut a déjà été modifié
  if (application.status !== 'En attente') {
    return;
  }

  const updateData: Partial<Application> = {
    status: newStatus
  };

  this.applicationService.updateapplicationstatus(application.id, updateData).subscribe({
    next: (updatedApp) => {
      // Mise à jour de l'application dans le tableau
      const index = this.allApplications.findIndex(a => a.id === application.id);
      if (index !== -1) {
        this.allApplications[index] = { ...this.allApplications[index], ...updatedApp };
      }
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour du statut', err);
    }
  });
}
}