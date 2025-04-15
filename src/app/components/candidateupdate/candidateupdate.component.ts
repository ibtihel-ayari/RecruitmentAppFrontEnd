import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../../models/candidate.models';
import { CandidateService } from '../../services/candidate.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidateupdate',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './candidateupdate.component.html',
  styleUrl: './candidateupdate.component.css'
})
export class CandidateupdateComponent {
candidate: Candidate | null = null;
candidateId!: number;

  constructor(
    private route: ActivatedRoute,
    private candidateservice: CandidateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.candidateId = Number(this.route.snapshot.paramMap.get('id'));  // Get user ID from route
    if (this.candidateId) {
      this.candidateservice.getCandidatesByID(this.candidateId).subscribe(response => {
        this.candidate = response as Candidate;
      });
    }
  }

  updateCandidate() {
    if (this.candidate) {
      this.candidateservice.updateCandidate(this.candidateId, this.candidate).subscribe(() => {
        this.router.navigate(['/candidate']);  // Redirect after saving
      });
    }
  }

  cancelEdit() {
    this.router.navigate(['/candidate']);  // Redirect back without saving
  }
}