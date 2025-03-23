import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
private ApiUrl = 'https://localhost:44353/api/Candidate';
  constructor(private http:HttpClient) { }
  // Get all Candidates
  getCandidates():Observable<any>{
    return this.http.get<any>(`${this.ApiUrl}/GetAllCandidates`,{observe:'response'});
  }
  // Get Candidate by ID
  getCandidatesByID(id:number):Observable<any>{
    return this.http.get<any>(`${this.ApiUrl}/GetCCandidateById/${id}`)
  }
  

}
