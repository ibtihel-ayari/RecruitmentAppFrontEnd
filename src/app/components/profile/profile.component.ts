import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

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
  profilePicturePreview: string | null = null;

  constructor(private router:Router,private userService: UserService) {}

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
        next: (response) => {
          this.successMessage = 'Profil mis à jour avec succès !';
  
          // ✅ Mette à jour le currentUser avec les nouvelles données du backend
          const updatedUser = response.user;
          this.currentUser = updatedUser;
          this.updatedUserData = { ...updatedUser };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  
          // ✅ Met à jour la preview si la photo a été modifiée
          if (updatedUser.photoPath) {
            this.profilePicturePreview = this.getFileUrl(updatedUser.photoPath);
          }
  
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
      const file = input.files[0];
      this.profilePicture = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicturePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }}
  getFileUrl(path: string | null): string {
    return path ? `https://localhost:44353${path}` : 'assets/default-avatar.png';
  }
  
  goBack(): void {
    this.router.navigate(['/dashboard']); 
  }
  
  
}


