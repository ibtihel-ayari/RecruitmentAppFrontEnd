import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationAnalysis } from '../models/applicationanalysis.model';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private baseUrl = 'https://localhost:44353/api/Analysis'; // change l'URL si besoin

  constructor(private http: HttpClient) {}

  analyzeApplications(jobOfferId: number): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.baseUrl}/AnalyzeApplications?jobOfferId=${jobOfferId}`, null);
  }

  getTopApplications(jobOfferId: number, topCount: number): Observable<ApplicationAnalysis[]> {
    let params = new HttpParams()
      .set('jobOfferId', jobOfferId.toString())
      .set('topCount', topCount.toString());

    return this.http.get<ApplicationAnalysis[]>(`${this.baseUrl}/GetTopApplications?jobOfferId=${jobOfferId}&topCount=${topCount}`, { params });
  }
}