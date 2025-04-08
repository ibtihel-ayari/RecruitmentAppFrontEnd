import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate.models';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
private ApiUrl = 'https://localhost:44353/api/';
  constructor(private http:HttpClient) { }

  getCandidates():Observable<any>{
    return this.http.get<any>(`${this.ApiUrl}Candidate/GetAllCandidates`,{observe:'response'});
  }
  // Get Candidate by ID
  getCandidatesByID(id:number):Observable<any>{
    return this.http.get<any>(`${this.ApiUrl}Candidate/GetCandidateById?id=${id}`)
  }
  //create Candidate  
  createCandidate(Candidate: Candidate):Observable<Candidate>{
    return this.http.post<Candidate>(`${this.ApiUrl}/Auth/registerCandidate`,Candidate);
  }
  //delete Candidate
  deleteCandidate(id:number):Observable<any>{
    return this.http.delete<any>(`${this.ApiUrl}Candidate/DeleteCandidate?candidateId=${id}`)
  }

  

}
