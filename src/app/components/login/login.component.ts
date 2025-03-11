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
        this.router.navigate(['/dashboard']);
      },
      error: (response) => {
        alert(JSON.stringify(response.error));
      },
    });
  }
}