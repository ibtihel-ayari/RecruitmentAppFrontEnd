import { Component } from '@angular/core';
import { JobOffer } from '../../models/job-offer.model';
import { Router } from '@angular/router';
import { JobofferService } from '../../services/joboffer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobofferadd',
  standalone: true,
  imports: [FormsModule],
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
constructor(private router:Router,private jobofferservice: JobofferService ){}

onSubmit(): void {
  this.jobofferservice.createJobOffer(this.joboffer).subscribe(
    (response) => {
      console.log('Job offer created:', response);
      this.router.navigate(['/joboffer']);  // Redirect to 'joboffer' page
    },
    (error) => {
      console.error('Error creating job offer:', error);
    }
  );

}
goBack(): void {
  this.router.navigate(['/joboffer']);}
}
