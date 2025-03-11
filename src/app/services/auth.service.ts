import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { UserRegistration } from '../models/user-registration.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44353/api/Auth/login'; // API URL for authentication
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    // Get current user from local storage or set to null
    const user = localStorage.getItem('currentUser');
    try {
      this.currentUserSubject = new BehaviorSubject<any>(
        user ? JSON.parse(user) : null
      );
    } catch (error) {
      console.error('Error parsing user from localStorage', error);
      this.currentUserSubject = new BehaviorSubject<any>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  registerUser(user: UserRegistration): Observable<any> {
   return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Get current user value
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}`, { email, password })
      .pipe(
        map((response) => {
          // Store user details and JWT in local storage
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          return response;
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  // Logout method
  logout(): void {
    // Remove user data and JWT from local storage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Navigate to login page
  }

  
  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}