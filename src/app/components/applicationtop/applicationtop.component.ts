import { Component, OnInit } from '@angular/core';
import { ApplicationAnalysis } from '../../models/applicationanalysis.model';
import { AnalysisService } from '../../services/analysis.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';

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


  constructor(
    private analysisService: AnalysisService,
    private applicationService:ApplicationService,
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
  
  
}