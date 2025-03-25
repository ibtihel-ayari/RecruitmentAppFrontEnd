import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../../models/user-registration.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUserId: number | null = null;
  selectedUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }
    
  


  trackByFn(index: number, user: any): number {
    return user.id
  }

    loadUsers() {
    this.userService.getUsers().subscribe(
      {
        next: (response) => {
          this.users = response.body as User[];
          console.log('Liste des utilisateurs:', response.body);  
        },
        error: (error) => {
          console.error('Erreur lors du chargement des utilisateurs', error);
      }}
    );
    }
 

  selectUser(user: User) {
    this.selectedUser = { ...user };
  }

  deleteSelectedUser() {
    if (this.selectedUserId !== null) {
      this.userService.deleteUser(this.selectedUserId).subscribe(() => {
        this.selectedUserId = null;
        this.loadUsers();
      });
    } else {
      alert('Veuillez sélectionner un utilisateur à supprimer.');
    }
  }
/*
  updateUser() {
    if (this.selectedUser && this.selectedUser.Id !== undefined) {
      this.userService.updateUser(this.selectedUser.Id, this.selectedUser).subscribe(() => {
        this.loadUsers();
        this.selectedUser = null;
      });
    }
  }*/

    

  deleteUser(id: number) {
    
    if (id !== undefined) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }
  
}
