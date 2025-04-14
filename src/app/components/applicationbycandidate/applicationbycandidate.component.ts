import { Component } from '@angular/core';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { CandidateService } from '../../services/candidate.service';
import { JobofferService } from '../../services/joboffer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-applicationbycandidate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './applicationbycandidate.component.html',
  styleUrl: './applicationbycandidate.component.css'
})
export class ApplicationbycandidateComponent {
applications: Application [] = []; // Store multiple applications
selectedApplicationId: number | null = null;
  selectedApplication: Application | null = null;
  successMessage: string | null = null;
  candidateNames: { [key: number]: string } = {}; // Cache pour stocker les noms des candidats
  jobOfferTitles: { [key: number]: string } = {}; // Cache pour les titres des offres
  filteredApplications: Application[] = []; // Applications filtrées
  searchTerm: string = ''; // Terme de recherche
  currentCandidateId: number | null = null;



constructor(private applicationService: ApplicationService, private candidateservice: CandidateService, private jobOfferService: JobofferService){}
ngOnInit(): void {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    this.currentCandidateId = user.id;
  }
  


  this.loadApplications();
}



loadApplications() {
  this.applicationService.getApplications().subscribe({
    next: (response) => {
      const allApplications = response as Application[];

      // Filtrer pour n'avoir que celles du candidat connecté
      if (this.currentCandidateId !== null) {
        this.applications = allApplications.filter(app => app.candidateId === this.currentCandidateId);
      } else {
        this.applications = []; // ou garde tout si besoin
      }

      console.log('Candidatures du candidat connecté :', this.applications);
      this.loadCandidateNames();
      this.loadJobOfferTitles();
    },
    error: (error) => {
      console.error('Erreur lors du chargement des applications', error);
    }
  });
}



    getFileUrl(path: string): string {
      return `https://localhost:44353${path}`;
    }
    

     //deleteSelectedCandidat
       selectApplication(application: Application) {
          this.selectedApplication = { ...application };
        }
      
        deleteSelectedApplication() {
          if (this.selectedApplicationId !== null) {
            const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette candidature ?");
        
            if (confirmation) {
              this.applicationService.deleteApplication(this.selectedApplicationId).subscribe(() => {
                this.successMessage = "Candidature supprimée avec succès !";
                this.selectedApplicationId = null;
                this.loadApplications();
        
                // Effacer le message après 3 secondes
                setTimeout(() => {
                  this.successMessage = null;
                }, 3000);
              });
            }
          } else {
            alert('Veuillez sélectionner une candidature à supprimer.');
          }
        }


        loadCandidateNames() {
          this.applications.forEach(application => {
            if (!this.candidateNames[application.candidateId]) {
              this.candidateservice.getCandidatesByID(application.candidateId).subscribe({
                next: (candidate) => {
                  // Stocker le nom complet dans le cache
                  this.candidateNames[application.candidateId] = 
                    `${candidate.firstName} ${candidate.lastName}`;
                },
                error: (error) => {
                  console.error(`Erreur lors du chargement du candidat ${application.candidateId}`, error);
                  this.candidateNames[application.candidateId] = 'Inconnu';
                }
              });
            }
          });
        }
        loadJobOfferTitles() {
          const promises = this.applications.map(application => {
            if (!this.jobOfferTitles[application.jobOfferId]) {
              return new Promise<void>((resolve) => {
                this.jobOfferService.getJobOffersById(application.jobOfferId).subscribe({
                  next: (jobOffer) => {
                    this.jobOfferTitles[application.jobOfferId] = jobOffer.title;
                    resolve();
                  },
                  error: (error) => {
                    console.error(`Erreur lors du chargement de l'offre ${application.jobOfferId}`, error);
                    this.jobOfferTitles[application.jobOfferId] = 'Offre inconnue';
                    resolve();
                  }
                });
              });
            }
            return Promise.resolve();
          });
      
          Promise.all(promises).then(() => {
            this.filterApplications(); // Applique le filtre après chargement des titres
          });
        }

        getCandidateName(candidateId: number): string {
          return this.candidateNames[candidateId] || 'Chargement...';
        }
        getJobOfferTitle(jobOfferId: number): string {
          return this.jobOfferTitles[jobOfferId] || 'Chargement...';
        }



        // Ajoutez cette nouvelle méthode pour filtrer les applications
  filterApplications() {
    if (!this.searchTerm) {
      this.filteredApplications = [...this.applications];
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredApplications = this.applications.filter(application => {
      const offerTitle = this.jobOfferTitles[application.jobOfferId]?.toLowerCase() || '';
      return offerTitle.includes(searchTermLower);
    });
  }
        
}
