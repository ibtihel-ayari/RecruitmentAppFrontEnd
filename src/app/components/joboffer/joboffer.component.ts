import { Component, OnInit } from '@angular/core';
import { JobOffer } from '../../models/job-offer.model';
import { JobofferService } from '../../services/joboffer.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-joboffer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './joboffer.component.html',
  styleUrl: './joboffer.component.css'
})
export class JobofferComponent implements OnInit {
  jobOffers: JobOffer[] = []; // Store multiple job offers

  constructor(private jobOfferService: JobofferService) {}

  ngOnInit() {
    this.loadJobOffers(); 
  }

  loadJobOffers() {
    this.jobOfferService.getJobOffer().subscribe(
      (data: JobOffer[]) => {
        this.jobOffers = data;
        console.log('Liste des offres d\'emploi:', this.jobOffers);
      },
      (error) => {
        console.error('Erreur lors du chargement des offres d\'emploi', error);
      }
    );
  }
}