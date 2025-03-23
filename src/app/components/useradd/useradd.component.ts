import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useradd',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './useradd.component.html',
  styleUrl: './useradd.component.css'
})
export class UseraddComponent {
  userForm: FormGroup;

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
          this.userForm.reset();
          this.router.navigate(['/user']);  // Redirect to 'user' page

        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }
  }
}