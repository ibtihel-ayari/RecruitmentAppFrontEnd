import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  user: any;
  isDropdownOpen: boolean = false;
  hasValidPhoto: boolean = true;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.getUser();

    // Vérifie si une photo est présente
    this.hasValidPhoto = !!this.user?.photoPath;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getUser(): any {
    const user = localStorage.getItem('currentUser');
    if (user && user !== 'undefined') {
      try {
        return JSON.parse(user);
      } catch (error) {
        console.error('Error parsing user from localStorage', error);
        return null;
      }
    }
    return null;
  }

  logout(): void {
    this.auth.logout();
  }

  getUserPhoto(): string {
    if (this.user && this.user.photoPath) {
      return `https://localhost:44353${this.user.photoPath}`;
    }
    return ''; // retourne vide si pas de photo, on gère ça dans le HTML
  }

  handleImageError(): void {
    this.hasValidPhoto = false;
  }

  goProfile(): void {
    this.router.navigate(['/profile']);
  }
}