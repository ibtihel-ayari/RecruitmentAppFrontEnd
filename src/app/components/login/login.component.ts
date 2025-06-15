import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  moveLogos(direction: number): void {
    const logos = document.getElementById("logos");
    if (logos) {
      logos.style.transform = `translateX(${direction * 100}px)`;
      setTimeout(() => {
        logos.style.transform = "translateX(0)";
      }, 500);
    }
  }

  login(form: NgForm): void {
    if (form.invalid) {
      // Mark all fields as touched to show validation messages
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        const currentUser = this.authService.currentUserValue;
        
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
            default:
              this.router.navigate(['/']);
          }
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please check your credentials and try again.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}