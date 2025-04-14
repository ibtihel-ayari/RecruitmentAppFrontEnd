import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/User/GetUserById?id=${id}`);
  }

  // Create a new User
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/Auth/register`, user);
  }

  // Update an existing User
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/Auth/updateUser`, user);
  }

  // Delete a User
  deleteUser(id: number): Observable<void> {
   return this.http.delete<void>(`${this.apiUrl}/User/DeleteUser?userId=${id}`); 
  }
}
