import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userupdate',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './userupdate.component.html',
  styleUrl: './userupdate.component.css'
})
export class UserupdateComponent implements OnInit {
  user: User | null = null;
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));  // Get user ID from route
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(response => {
        this.user = response as User;
      });
    }
  }

  updateUser() {
    if (this.user) {
      this.userService.updateUser(this.userId, this.user).subscribe(() => {
        this.router.navigate(['/user']);  // Redirect after saving
      });
    }
  }

  

  goBack(): void {
    this.router.navigate(['/user']); 
  }
}