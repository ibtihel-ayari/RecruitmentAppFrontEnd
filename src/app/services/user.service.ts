import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegistration } from '../models/user-registration.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private apiUrl = 'https://localhost:44353/api';

  constructor(private http: HttpClient) { }

  // Get all Users
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/User/GetAllUsers` ,{observe: 'response'});
  }

  // Get User by ID
  getUserById(id: number): Observable<UserRegistration> {
    return this.http.get<UserRegistration>(`${this.apiUrl}/User/GetUserById/${id}`);
  }

  // Create a new User
  createUser(user: UserRegistration): Observable<UserRegistration> {
    return this.http.post<UserRegistration>(`${this.apiUrl}/Auth/register`, user);
  }

  // Update an existing User
  updateUser(id: number, user: UserRegistration): Observable<UserRegistration> {
    return this.http.put<UserRegistration>(`${this.apiUrl}/User/PutUser/${id}`, user);
  }

  // Delete a User
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/User/DeleteUser/${id}`);
  }
}
