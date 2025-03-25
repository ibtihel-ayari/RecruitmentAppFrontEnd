import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { JobofferComponent } from './components/joboffer/joboffer.component';
import { UserComponent } from './components/user/user.component';
import { UseraddComponent } from './components/useradd/useradd.component';
import { UserupdateComponent } from './components/userupdate/userupdate.component';
import { JobofferaddComponent } from './components/jobofferadd/jobofferadd.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'joboffer', component: JobofferComponent },
    { path: 'addjoboffer', component: JobofferaddComponent },
    { path: 'user', component: UserComponent },
    { path: 'adduser', component: UseraddComponent },
    { path: 'updateuser/:id', component: UserupdateComponent },




    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
