import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { JobofferComponent } from './components/joboffer/joboffer.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'joboffer', component: JobofferComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
