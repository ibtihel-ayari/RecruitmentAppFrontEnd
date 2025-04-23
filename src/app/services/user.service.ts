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
  updateUsers(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/Auth/updateUser`, user);
  }
  updateUser(id: number, user: User): Observable<any> {
    const formData = new FormData();
    
    // Ajoutez tous les champs au FormData
    formData.append('Id', id.toString());
    formData.append('FirstName', user.firstName);
    formData.append('LastName', user.lastName);
    formData.append('Email', user.email);
    formData.append('Password', user.password || '');
    formData.append('Role', user.role);
    
    // Si vous avez une photo à uploader
    if (user.photo) {
      formData.append('Photo', user.photo);
    }
  
    return this.http.put(`${this.apiUrl}/Auth/updateUser`, formData);
  }

  // Delete a User
  deleteUser(id: number): Observable<void> {
   return this.http.delete<void>(`${this.apiUrl}/User/DeleteUser?userId=${id}`); 
  }
}
