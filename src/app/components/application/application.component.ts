import { Component, OnInit } from '@angular/core';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent implements OnInit {
applications: Application [] = []; // Store multiple applications
selectedApplicationId: number | null = null;
  selectedApplication: Application | null = null;
  successMessage: string | null = null;
  candidateNames: { [key: number]: string } = {}; // Cache pour stocker les noms des candidats

constructor(private applicationService: ApplicationService, private candidateservice: CandidateService){}
ngOnInit(): void {
  this.loadApplications();
}



    loadApplications() {
      this.applicationService.getApplications().subscribe(
        {
          next:(response) =>{
            this.applications=response as Application[];
            console.log('Liste des applications:', response);
             // Charger les noms des candidats pour chaque application
            this.loadCandidateNames();
          },
          error:(error)=>{
            console.error('Erreur lors du chargement des applications', error);
          }
        })
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
      
        getCandidateName(candidateId: number): string {
          return this.candidateNames[candidateId] || 'Chargement...';
        }
        
}
