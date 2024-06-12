import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ManageTagsComponent } from './pages/manage-tags/manage-tags.component';
import { authGuard } from './auth.guard';
import { PagePrnewComponent } from './pages/prnew/page-prnew/page-prnew.component';
import { PageCreatePrnewComponent } from './pages/prnew/page-create-prnew/page-create-prnew.component';
import { PageEditPrnewComponent } from './pages/prnew/page-edit-prnew/page-edit-prnew.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'tags',
    component: ManageTagsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'prnew',
    component: PagePrnewComponent
  },
  {
    path: 'create-prnew',
    component: PageCreatePrnewComponent
  },
  {
    path: 'edit-prnew',
    component: PageEditPrnewComponent
  }
];
