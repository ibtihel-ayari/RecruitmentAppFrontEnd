import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  logout():void{
    this.auth.logout()
  }
  getUser() : any {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
    return  user
  }
}
