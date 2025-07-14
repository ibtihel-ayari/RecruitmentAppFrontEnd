import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-useradd',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './useradd.component.html',
  styleUrl: './useradd.component.css'
})
export class UseraddComponent {
  userForm: FormGroup;
successMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService,private  router: Router) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

  onSubmit() {
  if (this.userForm.valid) {
    const newUser: User = this.userForm.value;
    this.userService.createUser(newUser).subscribe(
      (response) => {
        console.log('User created:', response);
        this.successMessage = 'Utilisateur ajouté avec succès !';
        this.userForm.reset();

        // Affiche le message pendant 2,5 secondes, puis redirige
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigate(['/user']);
        }, 2500);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
}

  goBack(): void {
    this.router.navigate(['/user']); 
  }
}