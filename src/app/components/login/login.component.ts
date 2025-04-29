import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
       // Get the current user from the auth service
       const currentUser = this.authService.currentUserValue;
        
       // Redirect based on role
       if (currentUser) {
         switch(currentUser.role) {
           case 'RH':
             this.router.navigate(['/dashboardrh']);
             break;
           case 'Candidate':
             this.router.navigate(['/dashboardcandidate']);
             break;
           case 'Admin':
             this.router.navigate(['/dashboard']); 
             break;
         }
       }
     },
      error: (response) => {
        alert(JSON.stringify(response.error));
      },
    });
  }
}