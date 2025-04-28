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
    return this.http.post<Candidate>(`${this.ApiUrl}Auth/registerCandidate`,Candidate);
  }
  //update Candidate
 updateCandidates(id: number, candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.ApiUrl}Auth/updateCandidate`, candidate);
  }
  
  updateCandidate(id: number, userData: any, photo?: File): Observable<any> {
    const formData = new FormData();
    
    // Ajouter toutes les propriétés de l'utilisateur
    formData.append('Id', id.toString());
    formData.append('FirstName', userData.firstName);
    formData.append('LastName', userData.lastName);
    formData.append('Email', userData.email);
    formData.append('BirthDate', userData.birthDate);
    if (userData.password) {
      formData.append('Password', userData.password);
    }
    if (userData.role) {
      formData.append('Role', userData.role);
    }
    
    // Ajouter la photo si elle existe
    if (photo) {
      formData.append('Photo', photo);
    }

    return this.http.put(`${this.ApiUrl}Auth/updateCandidate`, formData);
  }


  //delete Candidate
  deleteCandidate(id:number):Observable<any>{
    return this.http.delete<any>(`${this.ApiUrl}Candidate/DeleteCandidate?candidateId=${id}`)
  }

  

}
