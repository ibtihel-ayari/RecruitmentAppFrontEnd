import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../models/candidate.models';
import { CandidateService } from '../../services/candidate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.css'
})
export class CandidateComponent implements OnInit {
  candidates: Candidate[] = [];
  selectedCandidateId: number | null = null;
  selectedCandidate: Candidate | null = null;

  constructor(private candidateservice: CandidateService) {}

  ngOnInit(): void {
    this.loadCandidates();
  }

  loadCandidates() {  
this.candidateservice.getCandidates().subscribe(
      {
        next: (response) => {
          this.candidates = response.body as Candidate[];
          console.log('Liste des candidats:', response.body);  
        },
        error: (error) => {
          console.error('Erreur lors du chargement des candidats', error);
      }}
    );
  }
  trackByFn(index: number, candidate: any): number {
    return candidate.id
  }
  //deleteSelectedCandidat
   selectCandidate(candidat: Candidate) {
      this.selectedCandidate = { ...candidat };
    }
  
    deleteSelectedCandidate() {
      if (this.selectedCandidateId !== null) {
        this.candidateservice.deleteCandidate(this.selectedCandidateId).subscribe(() => {
          this.selectedCandidateId = null;
          this.loadCandidates();
        });
      } else {
        alert('Veuillez sélectionner un candidat à supprimer.');
      }
    }
}
