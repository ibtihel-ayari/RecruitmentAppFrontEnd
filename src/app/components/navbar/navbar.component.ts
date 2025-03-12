import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  // State for dropdown visibility
  isDropdownOpen: boolean = false;
  // Toggle dropdown visibility
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
} 

  logout():void{
    this.auth.logout()
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
  

  islogged() : boolean {
    return this.auth.isAuthenticated()
  }
  isAdmin() : boolean {
    return this.auth.isAdmin()
  }
  isRH() : boolean {
    return this.auth.isRH()
  }
  isCandidate() : boolean {
    return this.auth.isCandidate()
  }

}
