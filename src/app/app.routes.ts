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
import { ApplicationComponent } from './components/application/application.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { CandidateaddComponent } from './components/candidateadd/candidateadd.component';
import { ApplicationaddComponent } from './components/applicationadd/applicationadd.component';
import { ApplicationbycandidateComponent } from './components/applicationbycandidate/applicationbycandidate.component';
import { CandidateupdateComponent } from './components/candidateupdate/candidateupdate.component';
import { InternofferComponent } from './components/internoffer/internoffer.component';
import { ApplicationtopComponent } from './components/applicationtop/applicationtop.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardrhComponent } from './components/dashboardrh/dashboardrh.component';
import { DashboardcandidateComponent } from './components/dashboardcandidate/dashboardcandidate.component';
import { QuizComponent } from './components/quiz/quiz.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboardrh', component: DashboardrhComponent },
    { path: 'dashboardcandidate', component: DashboardcandidateComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'joboffer', component: JobofferComponent },
    { path: 'addjoboffer', component: JobofferaddComponent },
    { path: 'internoffer', component: InternofferComponent },
    { path: 'user', component: UserComponent },
    { path: 'adduser', component: UseraddComponent },
    { path: 'updateuser/:id', component: UserupdateComponent },
    { path: 'candidate', component: CandidateComponent },
    { path: 'addcandidate', component: CandidateaddComponent },
    { path: 'updatecandidate/:id', component: CandidateupdateComponent },
    { path: 'application', component: ApplicationComponent },
    { path: 'addapplication', component: ApplicationaddComponent },
    { path: 'myapplication', component: ApplicationbycandidateComponent },
    {path: 'addapplication/:id',loadComponent: () => import('./components/applicationadd/applicationadd.component').then(m => m.ApplicationaddComponent)},
    { path: 'topapplication', component: ApplicationtopComponent },
    {path: 'topapplication/:id',loadComponent: () => import('./components/applicationtop/applicationtop.component').then(m => m.ApplicationtopComponent)},
    { path: 'profile', component:   ProfileComponent },
    { path: 'quiz', component:   QuizComponent },



    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
