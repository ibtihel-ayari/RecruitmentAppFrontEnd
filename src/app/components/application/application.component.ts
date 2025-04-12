import { Component, OnInit } from '@angular/core';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

constructor(private applicationService: ApplicationService){}
ngOnInit(): void {
  this.loadApplications();
}



    loadApplications() {
      this.applicationService.getApplications().subscribe(
        {
          next:(response) =>{
            this.applications=response as Application[];
            console.log('Liste des applications:', response);
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
        
}
