import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './scheduler.routing';
import { SchedulerComponent } from './scheduler.component';
import { MatIconModule } from '@angular/material/icon';
import { SchedulerCalendarComponent } from './scheduler-calendar/scheduler-calendar.component';
import { ChartComponent } from './chart/chart.component';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SchedulerComponent, SchedulerCalendarComponent, ChartComponent],
    imports: [
        CommonModule,
        routing,
        MatIconModule,
        MatCardModule,
        FlexModule
    ]
})
export class SchedulerModule {

}
