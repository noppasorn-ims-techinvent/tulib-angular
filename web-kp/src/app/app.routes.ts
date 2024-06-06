import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent : () => import('./pages/login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'register',
    loadComponent : () => import('./pages/register/register.component').then((c) => c.RegisterComponent)
  },
  {
    path: 'edit-profile',
    loadComponent : () => import('./pages/edit-profile/edit-profile.component').then((c) => c.EditProfileComponent)
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
