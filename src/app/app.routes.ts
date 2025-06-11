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

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]  },
    { path: 'dashboardrh', component: DashboardrhComponent, canActivate: [authGuard]  },
    { path: 'dashboardcandidate', component: DashboardcandidateComponent , canActivate: [authGuard] },
    { path: 'navbar', component: NavbarComponent, canActivate: [authGuard]  },
    { path: 'joboffer', component: JobofferComponent , canActivate: [authGuard] },
    { path: 'addjoboffer', component: JobofferaddComponent, canActivate: [authGuard]  },
    { path: 'internoffer', component: InternofferComponent, canActivate: [authGuard]  },
    { path: 'user', component: UserComponent, canActivate: [authGuard]  },
    { path: 'adduser', component: UseraddComponent, canActivate: [authGuard]  },
    { path: 'updateuser/:id', component: UserupdateComponent, canActivate: [authGuard]  },
    { path: 'candidate', component: CandidateComponent, canActivate: [authGuard]  },
    { path: 'addcandidate', component: CandidateaddComponent, canActivate: [authGuard]  },
    { path: 'updatecandidate/:id', component: CandidateupdateComponent, canActivate: [authGuard]  },
    { path: 'application', component: ApplicationComponent, canActivate: [authGuard]  },
    { path: 'addapplication', component: ApplicationaddComponent, canActivate: [authGuard]  },
    { path: 'myapplication', component: ApplicationbycandidateComponent, canActivate: [authGuard]  },
    {path: 'addapplication/:id',loadComponent: () => import('./components/applicationadd/applicationadd.component').then(m => m.ApplicationaddComponent), canActivate: [authGuard] },
    { path: 'topapplication', component: ApplicationtopComponent , canActivate: [authGuard] },
    {path: 'topapplication/:id',loadComponent: () => import('./components/applicationtop/applicationtop.component').then(m => m.ApplicationtopComponent), canActivate: [authGuard] },
    { path: 'profile', component:   ProfileComponent , canActivate: [authGuard] },
    { path: 'quiz', component:   QuizComponent , canActivate: [authGuard] },
    { path: 'quizgeneration', component:   QuizgenerationComponent , canActivate: [authGuard] },
    { path: 'passquiz/:quizId/:applicationId', component: QuizpassComponent , canActivate: [authGuard] },
    { path: 'validation', component:   FinalvalidationComponent , canActivate: [authGuard] },





    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
