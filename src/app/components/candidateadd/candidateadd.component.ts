import { Component } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../models/candidate.models';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidateadd',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './candidateadd.component.html',
  styleUrl: './candidateadd.component.css'
})

export class CandidateaddComponent  {
  candidate: Candidate={
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role:  "Candidate",
    birthDate: new Date(),
    Applications: []   
  }
  constructor(private router:Router,private CandidateService : CandidateService) {}


  
onSubmit(): void {
  this.CandidateService.createCandidate(this.candidate).subscribe(
    (response) => {
      console.log('Candidate created:', response);
      this.router.navigate(['/candidate']);  // Redirect to 'candidate' page
    },
    (error) => {
      console.error('Error creating candidate offer:', error);
    }
  );

}
}

