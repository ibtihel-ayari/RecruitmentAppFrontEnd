import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz.models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'https://localhost:44353/api/Quiz';

  constructor(private http: HttpClient) { }
// Fetch all quizzes
getQuizzes(): Observable<Quiz[]> {
  return this.http.get<Quiz[]>(`${this.apiUrl}/all`);
}
// Fetch quiz by ID Joboffer
  getQuizzesByJobOfferId(jobOfferId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/byJobOffer/${jobOfferId}`);
  }

// POST: Generate quiz using Gemini or logic behind
generateQuiz(request: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/generate`, request);
}

// POST: Save generated quiz (one or more)
saveGeneratedQuiz(quiz: Quiz[]): Observable<{ SavedQuizIds: number[] }> {
  return this.http.post<{ SavedQuizIds: number[] }>(`${this.apiUrl}/save`, quiz);
}

updateQuiz(quiz: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/update`, quiz);
}

// DELETE: Delete a quiz by ID
deleteQuiz(quizId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${quizId}`);
}
// Get a specific quiz by its ID
getQuizById(quizId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${quizId}`);
}
// Send quiz to candidate
sendQuizToCandidate(quizId: number, request: SendQuizRequest): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/send/${quizId}`, request);
}



}
