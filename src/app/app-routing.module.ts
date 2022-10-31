import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsAuthGuard } from './guards/is-auth.guard';
import { IsNotAuthGuard } from './guards/is-not-auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProjectCreationComponent } from './components/project-creation/project-creation.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [IsAuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/projects' },
      { path: 'projects', component: ProjectsComponent },
      { path: 'create-project', component: ProjectCreationComponent },
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [IsNotAuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [IsNotAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
