import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
private apiUrl = 'https://localhost:44353/api/Applications';
  constructor(private http: HttpClient) { }
//get all applications
getApplications():Observable<Application[]>{  
  return this.http.get<Application[]>(`${this.apiUrl}/GetAllApplications`);
}

  // Get application by id
  getApplicationById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/GetApplicationById?id=${id}`);
  }

  //get application by joboffer id
  /*getApplicationsByJobOfferId(id: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/GetApplicationsByJobOfferId?id=${id}`);
  }*/
 getPhotoUrl(photoPath: string): string {
  return `https://localhost:44353${photoPath}`;
}

// Get the last application by candidateId
getLastApplicationByCandidateId(candidateId: number): Observable<Application> {
  return this.http.get<Application>(`${this.apiUrl}/GetLastApplicationByCandidateId?candidateId=${candidateId}`);
}

 
  //create a new application
  createAppliation(application:Application):Observable<Application>{
    return this.http.post<Application>(`${this.apiUrl}/PostApplications`,application);
  }
  
  createApplications(application: Application, cvFile: File, photo: File): Observable<Application> {
    const formData = new FormData();
    
    // Append files
    formData.append('CVFile', cvFile);
    formData.append('Photo', photo);
    
    // Append other properties
    formData.append('CandidateId', application.candidateId.toString());
    formData.append('JobOfferId', application.jobOfferId.toString());
    formData.append('Status', application.status);
    formData.append('IsValidated', application.isValidated.toString());
  
    return this.http.post<Application>(`${this.apiUrl}/PostApplication`, formData);
  }

  //update la validation de la candidature
updateApplicationValidation(id: number, application: Partial<Application>): Observable<Application> {
  return this.http.patch<Application>(`${this.apiUrl}/UpdateApplicationValidation/${id}`, application);
}

      //update application status
   updateapplicationstatus(id: number, application: Partial<Application>): Observable<Application> {
    return this.http.patch<Application>(`${this.apiUrl}/UpdateApplicationStatus/${id}`, application);
  }


  //Delete an application
  deleteApplication(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/DeleteApplication?applicationId=${id}`);
  }


}
