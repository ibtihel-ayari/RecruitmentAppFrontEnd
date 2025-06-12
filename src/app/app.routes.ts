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
import { QuizgenerationComponent } from './components/quizgeneration/quizgeneration.component';
import { QuizpassComponent } from './components/quizpass/quizpass.component';
import { FinalvalidationComponent } from './components/finalvalidation/finalvalidation.component';
import { authGuard } from './auth.guard';
import { roleGuard } from './role.guard';

export const routes: Routes = [
{ path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard, roleGuard], data: { roles: ['Admin'] } },
  { path: 'dashboardrh', component: DashboardrhComponent, canActivate: [authGuard, roleGuard], data: { roles: ['RH'] } },
  { path: 'dashboardcandidate', component: DashboardcandidateComponent, canActivate: [authGuard, roleGuard], data: { roles: ['Candidate'] } },
  { path: 'navbar', component: NavbarComponent, canActivate: [authGuard] },

  // Job Offers
  { path: 'joboffer', component: JobofferComponent, canActivate: [authGuard, roleGuard], data: { roles: ['RH', 'Admin', 'Candidate'] } },
  { path: 'addjoboffer', component: JobofferaddComponent, canActivate: [authGuard, roleGuard], data: { roles: ['RH', 'Admin'] } },
  { path: 'internoffer', component: InternofferComponent, canActivate: [authGuard, roleGuard], data: { roles: ['RH', 'Admin', 'Candidate'] } },

  // Users
  { path: 'user', component: UserComponent, canActivate: [authGuard, roleGuard], data: { roles: ['Admin'] } },
  { path: 'adduser', component: UseraddComponent, canActivate: [authGuard, roleGuard], data: { roles: ['Admin'] } },
  { path: 'updateuser/:id', component: UserupdateComponent, canActivate: [authGuard, roleGuard], data: { roles: ['Admin'] } },

  // Candidates (admin only)
  { path: 'candidate', component: CandidateComponent, canActivate: [authGuard, roleGuard], data: { roles: ['Admin'] } },
  { path: 'addcandidate', component: CandidateaddComponent, canActivate: [authGuard, roleGuard], data: { roles: ['Admin'] } },
  { path: 'updatecandidate/:id', component: CandidateupdateComponent, canActivate: [authGuard, roleGuard], data: { roles: ['Admin'] } },

  // Applications
  { path: 'application', component: ApplicationComponent, canActivate: [authGuard, roleGuard], data: { roles: ['RH', 'Admin'] } },
  { path: 'addapplication', component: ApplicationaddComponent, canActivate: [authGuard, roleGuard], data: { roles: ['Candidate'] } },
  {
    path: 'addapplication/:id',
    loadComponent: () => import('./components/applicationadd/applicationadd.component').then(m => m.ApplicationaddComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Candidate'] }
  },
  { path: 'myapplication', component: ApplicationbycandidateComponent, canActivate: [authGuard, roleGuard], data: { roles: ['Candidate'] } },
  { path: 'topapplication', component: ApplicationtopComponent, canActivate: [authGuard, roleGuard], data: { roles: ['RH'] } },
  {
    path: 'topapplication/:id',
    loadComponent: () => import('./components/applicationtop/applicationtop.component').then(m => m.ApplicationtopComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['RH'] }
  },

  // Profile
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },

  // Quiz
  { path: 'quiz', component: QuizComponent, canActivate: [authGuard, roleGuard], data: { roles: ['RH', 'Admin'] } },
  { path: 'quizgeneration', component: QuizgenerationComponent, canActivate: [authGuard, roleGuard], data: { roles: ['Admin'] } },
  { path: 'passquiz/:quizId/:applicationId', component: QuizpassComponent, canActivate: [authGuard, roleGuard], data: { roles: ['Candidate'] } },

  // Final Validation
  { path: 'validation', component: FinalvalidationComponent, canActivate: [authGuard, roleGuard], data: { roles: ['RH', 'Admin'] } },

  // Default route
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
