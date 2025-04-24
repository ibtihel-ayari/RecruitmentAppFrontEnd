import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  updatedUserData: Partial<User> = {};
  profilePicture: File | null = null;
  successMessage: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
        this.updatedUserData = { ...this.currentUser };
      } catch (err) {
        console.error('Erreur lors du parsing JSON:', err);
      }
    } else {
      console.error('Aucun utilisateur connecté.');
    }
  }

  updateProfile() {
    if (this.currentUser && this.currentUser.id && this.updatedUserData) {
      const { id } = this.currentUser;
      this.userService.updateUser(id, this.updatedUserData, this.profilePicture || undefined).subscribe({
        next: () => {
          this.successMessage = 'Profil mis à jour avec succès !';
          localStorage.setItem('currentUser', JSON.stringify(this.updatedUserData));
          setTimeout(() => (this.successMessage = null), 3000);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du profil', error);
          this.successMessage = 'Erreur lors de la mise à jour du profil.';
        },
      });
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profilePicture = input.files[0];
    }
  }
  
}
