import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './devices.component';
import { AuthGuard } from './auth.guard';
import { DevicesListComponent } from './devices-list/devices-list.component';

const routes: Routes = [
  {
    path: '',
    component: DevicesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DevicesListComponent },
      { path: ':deviceId', loadChildren: () => import('./scheduler/scheduler.module').then(m => m.SchedulerModule) },
    ]
  },
];

export const routing = RouterModule.forChild(routes);
