import { Component } from '@angular/core';
import { Application } from '../../models/application.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applicationadd',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './applicationadd.component.html',
  styleUrl: './applicationadd.component.css'
})
export class ApplicationaddComponent {
  application: Application = {
    id: 0,
    cvFile: undefined,
    cvFilePath: "", 
    photo: undefined, 
    photoPath: "",
    submissionDate: new Date(),
    status: "En attente",
    isValidated: false,
    candidateId: 0, // sera mis à jour automatiquement
    jobOfferId: 0,
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationservice: ApplicationService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du candidat depuis localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.application.candidateId = user.id;
    }

    // Récupérer l'ID de l'offre depuis l'URL
    const jobOfferIdFromUrl = this.route.snapshot.paramMap.get('id');
    if (jobOfferIdFromUrl) {
      this.application.jobOfferId = Number(jobOfferIdFromUrl);
    }
  }

  onSubmit(): void {
    if (!this.application.cvFile || !this.application.photo) {
      console.error('CV and Photo are required');
      return;
    }

    this.applicationservice.createApplications(
      this.application,
      this.application.cvFile,
      this.application.photo
    ).subscribe(
      (response) => {
        console.log('Application created:', response);
        alert('Application created successfully!');
        this.router.navigate(['/joboffer']);
      },
      (error) => {
        console.error('Error creating application:', error);
      }
    );
  }

  onCvSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.application.cvFile = input.files[0];
    }
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.application.photo = input.files[0];
    }
  }
  goBack(): void {
    this.router.navigate(['/joboffer']); 
  }

}
 
