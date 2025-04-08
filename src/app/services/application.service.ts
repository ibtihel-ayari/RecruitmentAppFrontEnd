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
  getApplicationsByJobOfferId(id: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/GetApplicationsByJobOfferId?id=${id}`);
  }
 
  //create a new application
  createAppliation(application:Application):Observable<Application>{
    return this.http.post<Application>(`${this.apiUrl}/PostApplications`,application);
  }



  //Delete an application
  deleteApplication(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/DeleteApplication?applicationId=${id}`);
  }


}
