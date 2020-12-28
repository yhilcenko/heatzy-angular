import { RouterModule, Routes } from '@angular/router';
import { SchedulerComponent } from './scheduler.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulerComponent,
  },
];

export const routing = RouterModule.forChild(routes);
