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

// DELETE: Delete a quiz by ID
deleteQuiz(quizId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${quizId}`);
}


}
