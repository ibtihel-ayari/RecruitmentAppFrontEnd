import { Component } from '@angular/core';
import { JobOffer } from '../../models/job-offer.model';
import { Router } from '@angular/router';
import { JobofferService } from '../../services/joboffer.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobofferadd',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './jobofferadd.component.html',
  styleUrl: './jobofferadd.component.css'
})
export class JobofferaddComponent {
joboffer: JobOffer = {
    id: 0,
    title: "",
    description: "",
    location: "",
    requirements: "",
    technicalSkills: "",
    workExperience: "",
    academicBackground: "",
    languagesSpoken: "",
    type: "",  // Stage ou Emploi
    publicationDate: new Date(),
    applications: []
  };

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private jobofferservice: JobofferService
  ) {}

  onSubmit(form: NgForm): void {
    // Mark all fields as touched to show validation messages
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.jobofferservice.createJobOffer(this.joboffer).subscribe({
      next: (response) => {
        console.log('Job offer created:', response);
        this.router.navigate(['/joboffer']);  // Redirect to 'joboffer' page
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error creating job offer:', error);
        this.errorMessage = error.error?.message || 'Une erreur est survenue lors de la création de l\'offre. Veuillez réessayer.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/joboffer']);
  }
}
