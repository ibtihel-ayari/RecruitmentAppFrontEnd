import { Component, OnInit } from '@angular/core';
import { JobOffer } from '../../models/job-offer.model';
import { JobofferService } from '../../services/joboffer.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-joboffer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './joboffer.component.html',
  styleUrl: './joboffer.component.css'
})
export class JobofferComponent implements OnInit {
  jobOffers: JobOffer[] = []; // Store multiple job offers
  selectedJobOfferId: number | null = null;
  searchLocation: string = '';
  filteredJobOffers: JobOffer[] = [];


  constructor(private jobOfferService: JobofferService, private auth: AuthService) {}

  ngOnInit() {
    this.loadJobOffers(); 
  }

  loadJobOffers() {
    this.jobOfferService.getJobOffer().subscribe(
      (data: JobOffer[]) => {
        // Ne garder que les offres de type "Emploi"
        this.jobOffers = data.filter(offer => offer.type === 'Emploi');
        this.filteredJobOffers = [...this.jobOffers]; // initialiser avec les offres filtrées
        console.log('Offres de type Emploi:', this.jobOffers);
      },
      (error) => {
        console.error('Erreur lors du chargement des offres d\'emploi', error);
      }
    );
  }
  
  loadJobOffer() {
    this.jobOfferService.getJobOffer().subscribe(
      (data: JobOffer[]) => {
        this.jobOffers = data;
        this.filteredJobOffers = [...data]; // initialiser avec toutes les offres
        console.log('Liste des offres d\'emploi:', this.jobOffers);


      },
      (error) => {
        console.error('Erreur lors du chargement des offres d\'emploi', error);
      }
    );
  }
  deleteJobOffer(id: number) {
    
    if (id !== undefined) {
      this.jobOfferService.deleteJobOffer(id).subscribe(() => {
        this.loadJobOffers();
      });
    }
  }

  deleteSelectedJobOffer() {
    if (this.selectedJobOfferId !== null) {
      this.jobOfferService.deleteJobOffer(this.selectedJobOfferId).subscribe(() => {
        this.loadJobOffers();
        this.selectedJobOfferId = null; // Reset selection
      });
    }
  }
  filterByLocation() {
    const search = this.searchLocation.toLowerCase();
    this.filteredJobOffers = this.jobOffers.filter(offer =>
      offer.location.toLowerCase().includes(search)
    );
  }

  isAdmin() : boolean {
    return this.auth.isAdmin()
  }
  isRH() : boolean {
    return this.auth.isRH()
  }
  isCandidate() : boolean {
    return this.auth.isCandidate()
  }
}