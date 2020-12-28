import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices.component';
import { routing } from './devices.routing';
import { AuthGuard } from './auth.guard';
import { MatListModule } from '@angular/material/list';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [DevicesComponent, DevicesListComponent, HeaderComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    routing,
    MatButtonModule,
    MatCardModule
  ],
  providers: [
    AuthGuard
  ]
})
export class DevicesModule { }
