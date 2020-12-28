import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SecureGuard } from './secure.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [SecureGuard]
  }
];

export const routing = RouterModule.forChild(routes);
