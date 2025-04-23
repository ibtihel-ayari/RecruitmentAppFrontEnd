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

  constructor(private auth: AuthService,private router:Router) { }
  user: any;

  ngOnInit(): void {
    this.user = this.getUser();
  }
  
    // State for dropdown visibility
    isDropdownOpen: boolean = false;
    // Toggle dropdown visibility
    toggleDropdown() {
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
  
  logout():void{
    this.auth.logout()
  }
  getUserPhoto(): string {
    const user = this.getUser();
    if (user && user.photoPath) {
      return `https://localhost:44353${user.photoPath}`;  // Or your backend domain
    }
    return 'assets/user.png';  // Fallback default image
  }
  handleImageError(event: any): void {
    event.target.src = 'assets/user.png';
  }
  goProfile(): void {
    this.router.navigate(['/profile']); 
  }
  
}
