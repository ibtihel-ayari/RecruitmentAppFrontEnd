import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../models/candidate.models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: User | Candidate | null = null;
  updatedUserData: Partial<User & Candidate> = {}; // Combinaison des deux types
  profilePicture: File | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  profilePicturePreview: string | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
        this.updatedUserData = { ...this.currentUser };
        if (this.currentUser?.photoPath) {
          this.profilePicturePreview = this.getFileUrl(this.currentUser.photoPath);
        }
      } catch (err) {
        console.error('Erreur lors du parsing JSON:', err);
        this.errorMessage = 'Erreur lors du chargement des données utilisateur';
      }
    }
  }

  updateProfile(): void {
    if (!this.currentUser?.id || !this.updatedUserData) {
      this.errorMessage = 'Données utilisateur invalides';
      return;
    }

    const id = this.currentUser.id;
    const isCandidate = this.currentUser.role === 'Candidate';

    const serviceCall = isCandidate
      ? this.candidateService.updateCandidate(id, this.updatedUserData, this.profilePicture || undefined)
      : this.userService.updateUser(id, this.updatedUserData, this.profilePicture || undefined);

    serviceCall.subscribe({
      next: (response) => {
        const updatedUser = this.currentUser?.role === 'Candidate' ? response.candidate : response.user;
      
        if (!updatedUser || !updatedUser.firstName || !updatedUser.lastName) {
          console.error('Réponse update invalide:', updatedUser);
          this.errorMessage = "Erreur lors de la mise à jour du profil.";
          return;
        }
      
        this.successMessage = 'Profil mis à jour avec succès !';
        this.errorMessage = null;
      
        this.currentUser = updatedUser;
        this.updatedUserData = { ...updatedUser };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
        if (updatedUser?.photoPath) {
          this.profilePicturePreview = this.getFileUrl(updatedUser.photoPath);
        }
      
        setTimeout(() => {window.location.reload();  }, 1000);      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du profil', error);
        this.errorMessage = 'Erreur lors de la mise à jour du profil';
        this.successMessage = null;
      },
    });

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.profilePicture = input.files[0];
      this.previewProfilePicture();
    }
  }

  private previewProfilePicture(): void {
    if (!this.profilePicture) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.profilePicturePreview = reader.result as string;
    };
    reader.readAsDataURL(this.profilePicture);
  }

  getFileUrl(path: string | null | undefined): string {
    return path ? `https://localhost:44353${path}` : 'assets/default-avatar.png';
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}