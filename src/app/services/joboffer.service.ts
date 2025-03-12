import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobOffer } from '../models/job-offer.model';

@Injectable({
  providedIn: 'root'
})
export class JobofferService {
  private apiUrl = 'https://localhost:44353/api/JobOffer/GetAllJobOffers';

  constructor(private http: HttpClient) { }
  getJobOffer(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(`${this.apiUrl}`);
  }

  createJobOffer(jobOffer: any): Observable<JobOffer> {
    return this.http.post<any>(`${this.apiUrl}/create`, jobOffer);
  }
  getJobOffersbyid(id:number): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(`${this.apiUrl}/getbyid/${id}/`);
  }
}

