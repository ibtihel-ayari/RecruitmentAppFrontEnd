import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private auth: AuthService) { }

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
  
}
