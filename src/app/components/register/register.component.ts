import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserRegistration } from '../../models/user-registration.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: UserRegistration = {
    FirstName:  '',
    LastName:  '',
    Email:  '',
    Password:  '',
    Role:  '',   //'candidate'
    BirthDate: new Date(),
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  showSnackbar(body: string): void {
    this.snackBar.open(body, 'Close', {
      duration: 3000, // milliseconds
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'bottom', // 'top' | 'bottom'
    });
  }
  onSubmit(): void {
    this.authService.registerUser(this.user).subscribe({
      next: (response) => {
        this.showSnackbar('crée avec succès');
        this.router.navigate(['/login']);
      },
      error: (response) => {
        console.log(response);
        var error = JSON.stringify(response.error);
        this.showSnackbar(error);
      },
    });
  }
}
