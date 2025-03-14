import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobOffer } from '../models/job-offer.model';

@Injectable({
  providedIn: 'root'
})
export class JobofferService {
  private apiUrl = 'https://localhost:44353/api/JobOffer';

  constructor(private http: HttpClient) { }

  // Get all job offers
  getJobOffer(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(`${this.apiUrl}/GetAllJobOffers`);
  }

  // Get job offer by ID
  getJobOffersById(id: number): Observable<JobOffer> {
    return this.http.get<JobOffer>(`${this.apiUrl}/GetJobOfferById/${id}`);
  }

  // Create a new job offer
  createJobOffer(jobOffer: JobOffer): Observable<JobOffer> {
    return this.http.post<JobOffer>(`${this.apiUrl}/PostJobOffer`, jobOffer);
  }

  // Update an existing job offer
  updateJobOffer(id: number, jobOffer: JobOffer): Observable<JobOffer> {
    return this.http.put<JobOffer>(`${this.apiUrl}/PutJobOffer/${id}`, jobOffer);
  }

  // Delete a job offer
  deleteJobOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteJobOffer/${id}`);
  }
}