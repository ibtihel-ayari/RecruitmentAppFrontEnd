import { Component, OnInit } from '@angular/core';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent implements OnInit {
applications: Application [] = []; // Store multiple applications
selectedApplicationId: number | null = null;

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

}
