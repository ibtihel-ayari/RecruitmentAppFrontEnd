import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'https://localhost:44353/api/quiz';

  constructor(private http: HttpClient) { }

  
}
